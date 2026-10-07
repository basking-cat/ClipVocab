package clipgen

import (
	"context"
	"errors"
	"fmt"
	"log/slog"
	"strings"

	"github.com/basking-cat/clip-vocab/apps/server/internal/transcript"
	"github.com/basking-cat/clip-vocab/apps/server/internal/youtube"
	"golang.org/x/sync/errgroup"
)

const (
	maxCandidates    = 10
	fetchConcurrency = 5
)

// ErrNoTopics means the user has nothing to search for.
// The message is deleted because a retry cannot create preference topics.
var ErrNoTopics = errors.New("no preference topics")

// Store reads preference topics and writes video metadata.
type Store interface {
	Topics(ctx context.Context, userID string) ([]string, error)
	UpsertVideos(ctx context.Context, videos []youtube.Video) error
}

// Searcher looks up caption-filtered videos. *youtube.Client implements it.
type Searcher interface {
	Search(ctx context.Context, query string, maxResults int) ([]youtube.Video, error)
}

// Generate searches YouTube for the user's preference topics, keeps videos whose
// transcripts can be fetched, and upserts that metadata. Transcript text is not stored.
func Generate(ctx context.Context, userID string, store Store, searcher Searcher, fetcher transcript.Fetcher) (int, error) {
	if strings.TrimSpace(userID) == "" {
		return 0, ErrNoTopics
	}

	labels, err := store.Topics(ctx, userID)
	if err != nil {
		return 0, fmt.Errorf("load preference topics: %w", err)
	}
	query := joinLabels(labels)
	if query == "" {
		return 0, ErrNoTopics
	}

	videos, err := searcher.Search(ctx, query, maxCandidates)
	if err != nil {
		return 0, fmt.Errorf("search youtube: %w", err)
	}

	kept, err := filterWithCaptions(ctx, videos, fetcher)
	if err != nil {
		return 0, err
	}
	if err := store.UpsertVideos(ctx, kept); err != nil {
		return 0, fmt.Errorf("upsert videos: %w", err)
	}
	return len(kept), nil
}

func joinLabels(labels []string) string {
	parts := make([]string, 0, len(labels))
	for _, label := range labels {
		label = strings.TrimSpace(label)
		if label != "" {
			parts = append(parts, label)
		}
	}
	return strings.Join(parts, " ")
}

func filterWithCaptions(ctx context.Context, videos []youtube.Video, fetcher transcript.Fetcher) ([]youtube.Video, error) {
	if len(videos) == 0 {
		return nil, nil
	}

	kept := make([]bool, len(videos))
	g, gctx := errgroup.WithContext(ctx)
	g.SetLimit(fetchConcurrency)

	for i := range videos {
		idx := i
		videoID := videos[i].ID
		g.Go(func() error {
			items, err := fetcher.Fetch(gctx, videoID)
			if err != nil {
				if errors.Is(err, transcript.ErrUnavailable) {
					slog.Info("skipping video without transcript", "video_id", videoID)
					return nil
				}
				return fmt.Errorf("fetch transcript %s: %w", videoID, err)
			}
			if len(items) == 0 {
				slog.Info("skipping video with empty transcript", "video_id", videoID)
				return nil
			}
			kept[idx] = true
			return nil
		})
	}
	if err := g.Wait(); err != nil {
		return nil, err
	}

	out := make([]youtube.Video, 0, len(videos))
	for i, video := range videos {
		if kept[i] {
			out = append(out, video)
		}
	}
	return out, nil
}
