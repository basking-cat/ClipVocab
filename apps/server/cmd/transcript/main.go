package main

import (
	"context"
	"fmt"
	"os"
	"strings"

	"github.com/basking-cat/clip-vocab/apps/server/internal/ai"
	"github.com/basking-cat/clip-vocab/apps/server/internal/transcript"
)

func processVideo(videoID string) error {
	items, err := transcript.FetchTranscript(videoID)
	if err != nil {
		return fmt.Errorf("fetch transcript failed: %w", err)
	}

	var b strings.Builder
	for _, item := range items {
		b.WriteString(item.Text)
		b.WriteString(" ")
	}

	words, err := ai.ExtractVocab(context.Background(), b.String())
	if err != nil {
		return fmt.Errorf("extract vocab failed: %w", err)
	}

	fmt.Printf("Detected %d words for video %s\n", len(words), videoID)
	for _, w := range words {
		fmt.Printf("- %s (%s)\n", w.Word, w.Level)
	}
	return nil
}

func main() {
	if len(os.Args) < 2 {
		fmt.Println("usage: go run ./cmd/worker <video_id>")
		os.Exit(1)
	}

	videoID := os.Args[1]
	if err := processVideo(videoID); err != nil {
		fmt.Println("error:", err)
		os.Exit(1)
	}
}