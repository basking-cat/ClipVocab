package youtube

import (
	"context"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
	"time"
)

func TestSearchFiltersCaptionedVideosAndLoadsDuration(t *testing.T) {
	var searchParams, videoParams map[string]string

	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		q := map[string]string{}
		for k, v := range r.URL.Query() {
			if k == "key" {
				continue
			}
			q[k] = v[0]
		}
		switch r.URL.Path {
		case "/search":
			searchParams = q
			w.Header().Set("Content-Type", "application/json")
			_, _ = w.Write([]byte(`{
				"items": [
					{"id": {"videoId": "aaa"}},
					{"id": {"videoId": "bbb"}},
					{"id": {"kind": "youtube#channel"}}
				]
			}`))
		case "/videos":
			videoParams = q
			w.Header().Set("Content-Type", "application/json")
			_, _ = w.Write([]byte(`{
				"items": [
					{
						"id": "aaa",
						"snippet": {
							"title": "Daily vlog",
							"channelId": "ch1",
							"channelTitle": "Channel",
							"publishedAt": "2024-01-02T03:04:05Z",
							"defaultAudioLanguage": "en"
						},
						"contentDetails": {"duration": "PT1M30S"}
					},
					{
						"id": "bbb",
						"snippet": {
							"title": "Broken",
							"channelId": "ch2",
							"channelTitle": "Other",
							"publishedAt": "not-a-date"
						},
						"contentDetails": {"duration": "PT10S"}
					}
				]
			}`))
		default:
			http.NotFound(w, r)
		}
	}))
	defer srv.Close()

	c := &Client{APIKey: "test-key", BaseURL: srv.URL, HTTPClient: srv.Client()}
	got, err := c.Search(context.Background(), "daily vlog", 10)
	if err != nil {
		t.Fatalf("Search: %v", err)
	}

	if searchParams["type"] != "video" || searchParams["videoCaption"] != "closedCaption" || searchParams["relevanceLanguage"] != "en" || searchParams["maxResults"] != "10" || searchParams["q"] != "daily vlog" {
		t.Fatalf("search params = %#v", searchParams)
	}
	if videoParams["id"] != "aaa,bbb" || videoParams["part"] != "snippet,contentDetails" {
		t.Fatalf("videos params = %#v", videoParams)
	}
	if len(got) != 1 {
		t.Fatalf("len = %d, want 1 video with a parseable timestamp", len(got))
	}
	if got[0].ID != "aaa" || got[0].DurationSec != 90 || got[0].Language != "en" || got[0].Title != "Daily vlog" {
		t.Fatalf("video = %#v", got[0])
	}
	if !got[0].PublishedAt.Equal(time.Date(2024, 1, 2, 3, 4, 5, 0, time.UTC)) {
		t.Fatalf("published = %s", got[0].PublishedAt)
	}
}

func TestSearchAPIError(t *testing.T) {
	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		http.Error(w, "quota", http.StatusForbidden)
	}))
	defer srv.Close()

	c := &Client{APIKey: "secret-key", BaseURL: srv.URL, HTTPClient: srv.Client()}
	_, err := c.Search(context.Background(), "q", 3)
	if err == nil {
		t.Fatal("expected error")
	}
	if strings.Contains(err.Error(), "secret-key") {
		t.Fatalf("error leaked api key: %s", err)
	}
}
