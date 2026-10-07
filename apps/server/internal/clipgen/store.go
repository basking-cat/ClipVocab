package clipgen

import (
	"context"
	"fmt"

	"github.com/basking-cat/clip-vocab/apps/server/internal/youtube"
	"github.com/jackc/pgx/v5/pgxpool"
)

// PGStore reads preferences and writes videos through the worker's direct Postgres connection.
type PGStore struct {
	Pool *pgxpool.Pool
}

func (s PGStore) Topics(ctx context.Context, userID string) ([]string, error) {
	rows, err := s.Pool.Query(ctx, `
		SELECT pt.label
		FROM preference_topics pt
		JOIN preferences p ON p.id = pt.preference_id
		WHERE p.user_id = $1
		ORDER BY pt.weight DESC, pt.label ASC
	`, userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var labels []string
	for rows.Next() {
		var label string
		if err := rows.Scan(&label); err != nil {
			return nil, err
		}
		labels = append(labels, label)
	}
	return labels, rows.Err()
}

func (s PGStore) UpsertVideos(ctx context.Context, videos []youtube.Video) error {
	if len(videos) == 0 {
		return nil
	}

	tx, err := s.Pool.Begin(ctx)
	if err != nil {
		return err
	}
	defer tx.Rollback(ctx)

	for _, video := range videos {
		_, err := tx.Exec(ctx, `
			INSERT INTO videos (id, title, channel_id, channel_title, duration_sec, language, published_at)
			VALUES ($1, $2, $3, $4, $5, $6, $7)
			ON CONFLICT (id) DO UPDATE SET
				title = EXCLUDED.title,
				channel_id = EXCLUDED.channel_id,
				channel_title = EXCLUDED.channel_title,
				duration_sec = EXCLUDED.duration_sec,
				language = EXCLUDED.language,
				published_at = EXCLUDED.published_at
		`, video.ID, video.Title, video.ChannelID, video.ChannelTitle, video.DurationSec, video.Language, video.PublishedAt)
		if err != nil {
			return fmt.Errorf("upsert video %s: %w", video.ID, err)
		}
	}
	return tx.Commit(ctx)
}
