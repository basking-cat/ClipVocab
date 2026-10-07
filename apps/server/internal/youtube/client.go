package youtube

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"strings"
	"time"
)

const defaultBaseURL = "https://www.googleapis.com/youtube/v3"

// Video is the metadata stored in the videos table. ID is the YouTube video id.
type Video struct {
	ID           string
	Title        string
	ChannelID    string
	ChannelTitle string
	DurationSec  int
	Language     string
	PublishedAt  time.Time
}

// Client calls the YouTube Data API. BaseURL and HTTPClient are set in tests.
type Client struct {
	APIKey     string
	BaseURL    string
	HTTPClient *http.Client
}

// Search returns up to maxResults captioned videos for query.
// Search filters with videoCaption=closedCaption, then videos.list fills in duration and language.
func (c *Client) Search(ctx context.Context, query string, maxResults int) ([]Video, error) {
	if maxResults <= 0 {
		maxResults = 10
	}

	q := url.Values{}
	q.Set("part", "snippet")
	q.Set("q", query)
	q.Set("type", "video")
	q.Set("videoCaption", "closedCaption")
	q.Set("relevanceLanguage", "en")
	q.Set("maxResults", fmt.Sprintf("%d", maxResults))

	var searchResp searchResponse
	if err := c.get(ctx, "/search", q, &searchResp); err != nil {
		return nil, err
	}

	ids := make([]string, 0, len(searchResp.Items))
	seen := make(map[string]struct{}, len(searchResp.Items))
	for _, item := range searchResp.Items {
		id := item.ID.VideoID
		if id == "" {
			continue
		}
		if _, ok := seen[id]; ok {
			continue
		}
		seen[id] = struct{}{}
		ids = append(ids, id)
	}
	if len(ids) == 0 {
		return nil, nil
	}

	dq := url.Values{}
	dq.Set("part", "snippet,contentDetails")
	dq.Set("id", strings.Join(ids, ","))

	var detailsResp videosResponse
	if err := c.get(ctx, "/videos", dq, &detailsResp); err != nil {
		return nil, err
	}

	byID := make(map[string]Video, len(detailsResp.Items))
	for _, item := range detailsResp.Items {
		sec, err := ParseISODuration(item.ContentDetails.Duration)
		if err != nil {
			continue
		}
		published, err := time.Parse(time.RFC3339, item.Snippet.PublishedAt)
		if err != nil {
			continue
		}
		language := item.Snippet.DefaultAudioLanguage
		if language == "" {
			language = item.Snippet.DefaultLanguage
		}
		byID[item.ID] = Video{
			ID:           item.ID,
			Title:        item.Snippet.Title,
			ChannelID:    item.Snippet.ChannelID,
			ChannelTitle: item.Snippet.ChannelTitle,
			DurationSec:  sec,
			Language:     language,
			PublishedAt:  published,
		}
	}

	out := make([]Video, 0, len(ids))
	for _, id := range ids {
		if v, ok := byID[id]; ok {
			out = append(out, v)
		}
	}
	return out, nil
}

func (c *Client) get(ctx context.Context, path string, q url.Values, dest any) error {
	q.Set("key", c.APIKey)
	endpoint := c.base() + path + "?" + q.Encode()

	req, err := http.NewRequestWithContext(ctx, http.MethodGet, endpoint, nil)
	if err != nil {
		return fmt.Errorf("youtube request %s: %w", path, err)
	}

	resp, err := c.http().Do(req)
	if err != nil {
		return fmt.Errorf("youtube %s: %w", path, err)
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(io.LimitReader(resp.Body, 1<<20))
	if err != nil {
		return fmt.Errorf("youtube %s read body: %w", path, err)
	}
	if resp.StatusCode != http.StatusOK {
		// The request URL contains the API key, so the error keeps only the status and response body.
		return fmt.Errorf("youtube %s: status %d: %s", path, resp.StatusCode, strings.TrimSpace(string(body)))
	}
	if err := json.Unmarshal(body, dest); err != nil {
		return fmt.Errorf("youtube %s decode: %w", path, err)
	}
	return nil
}

func (c *Client) base() string {
	if c.BaseURL != "" {
		return strings.TrimRight(c.BaseURL, "/")
	}
	return defaultBaseURL
}

func (c *Client) http() *http.Client {
	if c.HTTPClient != nil {
		return c.HTTPClient
	}
	return http.DefaultClient
}

type searchResponse struct {
	Items []struct {
		ID struct {
			VideoID string `json:"videoId"`
		} `json:"id"`
	} `json:"items"`
}

type videosResponse struct {
	Items []struct {
		ID      string `json:"id"`
		Snippet struct {
			Title                string `json:"title"`
			ChannelID            string `json:"channelId"`
			ChannelTitle         string `json:"channelTitle"`
			PublishedAt          string `json:"publishedAt"`
			DefaultAudioLanguage string `json:"defaultAudioLanguage"`
			DefaultLanguage      string `json:"defaultLanguage"`
		} `json:"snippet"`
		ContentDetails struct {
			Duration string `json:"duration"`
		} `json:"contentDetails"`
	} `json:"items"`
}
