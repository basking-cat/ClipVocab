package transcript

import (
	"bytes"
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
)

// ErrUnavailable means this video has no transcript the fetcher can read.
// The job continues with the remaining candidates.
var ErrUnavailable = errors.New("transcript unavailable")

type TranscriptItem struct {
	Text     string  `json:"text"`
	Start    float64 `json:"start"`
	Duration float64 `json:"duration"`
}

// Fetcher loads a video's timed text. A missing transcript is ErrUnavailable.
// Any other error is a failure of the fetcher itself and should be retried.
type Fetcher interface {
	Fetch(ctx context.Context, videoID string) ([]TranscriptItem, error)
}

// PythonFetcher runs fetcher.py. Python and ScriptPath fall back to
// TRANSCRIPT_PYTHON / TRANSCRIPT_SCRIPT, then to python3 and a path beside the binary.
type PythonFetcher struct {
	Python     string
	ScriptPath string
}

func (p PythonFetcher) Fetch(ctx context.Context, videoID string) ([]TranscriptItem, error) {
	python := p.Python
	if python == "" {
		python = os.Getenv("TRANSCRIPT_PYTHON")
	}
	if python == "" {
		python = "python3"
	}

	script := p.ScriptPath
	if script == "" {
		script = ResolveScriptPath()
	}

	cmd := exec.CommandContext(ctx, python, script, videoID)
	var stdout bytes.Buffer
	var stderr bytes.Buffer
	cmd.Stdout = &stdout
	cmd.Stderr = &stderr

	err := cmd.Run()
	if err != nil {
		var exitErr *exec.ExitError
		if errors.As(err, &exitErr) {
			return nil, fmt.Errorf("%w: %s", ErrUnavailable, stderr.String())
		}
		return nil, fmt.Errorf("run transcript fetcher: %w", err)
	}

	var items []TranscriptItem
	if err := json.Unmarshal(stdout.Bytes(), &items); err != nil {
		return nil, fmt.Errorf("parse transcript JSON: %w", err)
	}
	if len(items) == 0 {
		return nil, ErrUnavailable
	}
	return items, nil
}

// ResolveScriptPath prefers TRANSCRIPT_SCRIPT, then fetcher.py next to the binary
// (the container layout), then the source path used by `go run` from apps/server.
func ResolveScriptPath() string {
	if p := os.Getenv("TRANSCRIPT_SCRIPT"); p != "" {
		return p
	}
	if exe, err := os.Executable(); err == nil {
		beside := filepath.Join(filepath.Dir(exe), "fetcher.py")
		if _, err := os.Stat(beside); err == nil {
			return beside
		}
	}
	return filepath.Join("internal", "transcript", "python", "fetcher.py")
}

// FetchTranscript is the single-video helper used by local commands.
func FetchTranscript(videoID string) ([]TranscriptItem, error) {
	return PythonFetcher{}.Fetch(context.Background(), videoID)
}
