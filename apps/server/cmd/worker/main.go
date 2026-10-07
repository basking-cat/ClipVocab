package main

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"log/slog"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/sqs"
	"github.com/basking-cat/clip-vocab/apps/server/internal/clipgen"
	"github.com/basking-cat/clip-vocab/apps/server/internal/transcript"
	"github.com/basking-cat/clip-vocab/apps/server/internal/youtube"
	"github.com/jackc/pgx/v5/pgxpool"
)

type job struct {
	Type string `json:"type"`
	ID   string `json:"id"`
}

func main() {
	// CloudWatch Logs / Datadog 等のログ集約基盤でフィルタリング・パースを容易にするため JSON ハンドラを使用
	logger := slog.New(slog.NewJSONHandler(os.Stdout, &slog.HandlerOptions{
		Level: slog.LevelInfo,
	}))
	slog.SetDefault(logger)

	// main 直下での os.Exit() 呼び出しは未実行 defer をスキップするため、
	// すべてのライフサイクル管理は run() 内で完結させ、戻り値のエラー判定のみを行う
	if err := run(); err != nil {
		slog.Error("application terminated unexpectedly", "error", err)
		os.Exit(1)
	}
	slog.Info("application stopped gracefully")
}

func run() error {
	// ECS / Kubernetes からのコンテナ停止シグナル（SIGTERM）およびローカル停止（SIGINT）を検知
	ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
	defer stop()

	queueURL := os.Getenv("QUEUE_URL")
	databaseURL := os.Getenv("DATABASE_URL")
	youtubeAPIKey := os.Getenv("YOUTUBE_API_KEY")
	if queueURL == "" || databaseURL == "" || youtubeAPIKey == "" {
		return errors.New("QUEUE_URL, DATABASE_URL, and YOUTUBE_API_KEY environment variables are required")
	}

	cfg, err := config.LoadDefaultConfig(ctx)
	if err != nil {
		return fmt.Errorf("load aws config: %w", err)
	}
	client := sqs.NewFromConfig(cfg)

	// 並行処理の安全性確保およびネットワーク瞬断時の自動再接続のため、単一 conn ではなく pool を使用
	pool, err := pgxpool.New(ctx, databaseURL)
	if err != nil {
		return fmt.Errorf("connect db pool: %w", err)
	}
	defer pool.Close()

	deps := workerDeps{
		sqs:  client,
		pool: pool,
		store: clipgen.PGStore{
			Pool: pool,
		},
		search:  &youtube.Client{APIKey: youtubeAPIKey},
		fetcher: transcript.PythonFetcher{},
	}

	slog.Info("started polling worker", "queue_url", queueURL)

	// API 障害・ネットワーク不通時のビジーループ防止用バックオフ設定
	backoff := 1 * time.Second
	const maxBackoff = 30 * time.Second

	for {
		// 次のポーリング前にシャットダウン要求をノンブロッキングで確認
		select {
		case <-ctx.Done():
			slog.Info("shutdown signal received, stopping polling loop")
			return nil
		default:
		}

		out, err := client.ReceiveMessage(ctx, &sqs.ReceiveMessageInput{
			QueueUrl:            aws.String(queueURL),
			MaxNumberOfMessages: 10,
			WaitTimeSeconds:     20, // コスト削減とレイテンシ低減のためロングポーリングを使用
		})
		if err != nil {
			// コンテナ停止によるキャンセルは正常終了として扱う
			if errors.Is(ctx.Err(), context.Canceled) {
				return nil
			}

			slog.Error("failed to receive messages, backing off",
				"error", err,
				"retry_after", backoff.String(),
			)

			// スリープ中であってもシグナル受信時に即座に抜ける
			select {
			case <-time.After(backoff):
				backoff = min(backoff*2, maxBackoff)
			case <-ctx.Done():
				return nil
			}
			continue
		}

		backoff = 1 * time.Second

		for _, msg := range out.Messages {
			body := aws.ToString(msg.Body)
			receipt := aws.ToString(msg.ReceiptHandle)

			if err := handleMessage(ctx, deps, queueURL, body, receipt); err != nil {
				// NOTE: メッセージは削除せずキューに残すことで、VisibilityTimeout 経過後に SQS 側で再試行。
				// 最大受信数を超えたものは SQS の DLQ（Dead Letter Queue）設定側で退避させる運用前提。
				slog.Error("failed to process message",
					"message_id", aws.ToString(msg.MessageId),
					"error", err,
				)
			}
		}
	}
}

type workerDeps struct {
	sqs     *sqs.Client
	pool    *pgxpool.Pool
	store   clipgen.Store
	search  clipgen.Searcher
	fetcher transcript.Fetcher
}

func handleMessage(
	ctx context.Context,
	deps workerDeps,
	queueURL, body, receipt string,
) error {
	var j job

	if err := json.Unmarshal([]byte(body), &j); err != nil {
		// リトライしても解消しない恒久エラーのため破棄。
		// 追跡・復旧調査ができるよう不正なペイロード全体をログに残す。
		slog.Warn("malformed json payload detected, dropping message",
			"error", err,
			"payload", body,
		)
		return deleteMessage(ctx, deps.sqs, queueURL, receipt)
	}

	switch j.Type {
	case "generate-clip":
		// 検索と字幕取得は 10 秒では終わらないため、このジョブだけ長めに切る。
		execCtx, cancel := context.WithTimeout(ctx, 2*time.Minute)
		defer cancel()

		n, err := clipgen.Generate(execCtx, j.ID, deps.store, deps.search, deps.fetcher)
		if errors.Is(err, clipgen.ErrNoTopics) {
			slog.Warn("generate-clip has no preference topics, dropping message",
				"job_id", j.ID,
			)
			return deleteMessage(ctx, deps.sqs, queueURL, receipt)
		}
		if err != nil {
			return fmt.Errorf("generate clip: %w", err)
		}

		slog.Info("stored videos with captions",
			"job_id", j.ID,
			"count", n,
		)
		return deleteMessage(ctx, deps.sqs, queueURL, receipt)

	case "review-eval":
		// DB の遅延・デッドロックによるワーカー全体のハングを防ぐため個別タイムアウトを設定
		execCtx, cancel := context.WithTimeout(ctx, 10*time.Second)
		defer cancel()

		_, err := deps.pool.Exec(execCtx,
			`insert into worker_pings (job_type, payload) values ($1, $2)`,
			j.Type, body,
		)
		if err != nil {
			return fmt.Errorf("db insert failed: %w", err)
		}

		slog.Info("successfully processed and saved job",
			"job_type", j.Type,
			"job_id", j.ID,
		)
		return deleteMessage(ctx, deps.sqs, queueURL, receipt)

	default:
		// 未知のジョブ種別。後方互換性やデプロイ順序の影響を考慮しログに残して破棄
		slog.Warn("unsupported job type, dropping message",
			"job_type", j.Type,
			"job_id", j.ID,
			"payload", body,
		)
		return deleteMessage(ctx, deps.sqs, queueURL, receipt)
	}
}

func deleteMessage(ctx context.Context, client *sqs.Client, queueURL, receipt string) error {
	delCtx, cancel := context.WithTimeout(ctx, 5*time.Second)
	defer cancel()

	_, err := client.DeleteMessage(delCtx, &sqs.DeleteMessageInput{
		QueueUrl:      aws.String(queueURL),
		ReceiptHandle: aws.String(receipt),
	})
	if err != nil {
		return fmt.Errorf("sqs delete failed: %w", err)
	}
	return nil
}
