package clipgen

import (
	"context"
	"errors"
	"testing"
	"time"

	"github.com/basking-cat/clip-vocab/apps/server/internal/transcript"
	"github.com/basking-cat/clip-vocab/apps/server/internal/youtube"
)

type fakeStore struct {
	labels []string
	err    error
	saved  []youtube.Video
}

func (s *fakeStore) Topics(context.Context, string) ([]string, error) {
	if s.err != nil {
		return nil, s.err
	}
	return s.labels, nil
}

func (s *fakeStore) UpsertVideos(_ context.Context, videos []youtube.Video) error {
	s.saved = append([]youtube.Video(nil), videos...)
	return nil
}

type fakeSearch struct {
	videos []youtube.Video
	err    error
	query  string
}

func (s *fakeSearch) Search(_ context.Context, query string, maxResults int) ([]youtube.Video, error) {
	s.query = query
	if maxResults != maxCandidates {
		return nil, errors.New("unexpected maxResults")
	}
	return s.videos, s.err
}

type fakeFetch struct {
	fail    map[string]error
	hardErr error
}

func (f fakeFetch) Fetch(_ context.Context, videoID string) ([]transcript.TranscriptItem, error) {
	if f.hardErr != nil && videoID == "hard" {
		return nil, f.hardErr
	}
	if err, ok := f.fail[videoID]; ok {
		return nil, err
	}
	return []transcript.TranscriptItem{{Text: "hello", Start: 1, Duration: 1}}, nil
}

func TestGenerateUpsertsOnlyVideosWithTranscripts(t *testing.T) {
	store := &fakeStore{labels: []string{"Tech", " Science "}}
	search := &fakeSearch{videos: []youtube.Video{
		{ID: "ok1", Title: "One", PublishedAt: time.Unix(0, 0).UTC()},
		{ID: "nope", Title: "Two"},
		{ID: "ok2", Title: "Three"},
	}}
	fetch := fakeFetch{fail: map[string]error{"nope": transcript.ErrUnavailable}}

	n, err := Generate(context.Background(), "user-1", store, search, fetch)
	if err != nil {
		t.Fatalf("Generate: %v", err)
	}
	if n != 2 || search.query != "Tech Science" {
		t.Fatalf("n=%d query=%q", n, search.query)
	}
	if len(store.saved) != 2 || store.saved[0].ID != "ok1" || store.saved[1].ID != "ok2" {
		t.Fatalf("saved = %#v", store.saved)
	}
}

func TestGenerateDropsMessageWhenTopicsAreMissing(t *testing.T) {
	store := &fakeStore{}
	search := &fakeSearch{}

	_, err := Generate(context.Background(), "user-1", store, search, fakeFetch{})
	if !errors.Is(err, ErrNoTopics) {
		t.Fatalf("err = %v", err)
	}
	if search.query != "" || store.saved != nil {
		t.Fatalf("search or upsert ran: query=%q saved=%v", search.query, store.saved)
	}
}

func TestGenerateDoesNotUpsertWhenFetcherFails(t *testing.T) {
	store := &fakeStore{labels: []string{"Tech"}}
	search := &fakeSearch{videos: []youtube.Video{{ID: "hard"}, {ID: "ok1"}}}
	fetch := fakeFetch{hardErr: errors.New("python missing")}

	_, err := Generate(context.Background(), "user-1", store, search, fetch)
	if err == nil {
		t.Fatal("expected error")
	}
	if store.saved != nil {
		t.Fatalf("upserted despite fetcher failure: %#v", store.saved)
	}
}

func TestGenerateReturnsSearchError(t *testing.T) {
	store := &fakeStore{labels: []string{"Tech"}}
	search := &fakeSearch{err: errors.New("quota")}

	_, err := Generate(context.Background(), "user-1", store, search, fakeFetch{})
	if err == nil {
		t.Fatal("expected error")
	}
	if store.saved != nil {
		t.Fatal("upserted after search failure")
	}
}
