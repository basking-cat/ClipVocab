-- ============================================================
-- ClipVocab - Initial Schema
-- ============================================================

-- users
CREATE TABLE users (
  id           TEXT PRIMARY KEY,
  name         TEXT,
  email        TEXT NOT NULL UNIQUE,
  photo_url    TEXT,
  native_lang  TEXT,
  cefr_level   TEXT,
  app_level    INTEGER DEFAULT 1,
  streak       INTEGER DEFAULT 0,
  last_active  DATE,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- preferences
CREATE TABLE preferences (
  id         TEXT PRIMARY KEY,
  user_id    TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  level      TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- preference_topics
CREATE TABLE preference_topics (
  id            TEXT PRIMARY KEY,
  preference_id TEXT NOT NULL REFERENCES preferences(id) ON DELETE CASCADE,
  label         TEXT NOT NULL,
  weight        FLOAT DEFAULT 1.0
);

-- videos
CREATE TABLE videos (
  id            TEXT PRIMARY KEY,
  title         TEXT,
  channel_id    TEXT,
  channel_title TEXT,
  duration_sec  INTEGER,
  language      TEXT,
  published_at  TIMESTAMPTZ
);

-- clips
CREATE TABLE clips (
  id          TEXT PRIMARY KEY,
  video_id    TEXT NOT NULL REFERENCES videos(id) ON DELETE CASCADE,
  start_sec   FLOAT NOT NULL,
  end_sec     FLOAT NOT NULL,
  transcript  TEXT,
  translation TEXT,
  key_phrase  TEXT,
  caption_src TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- clip_related_phrases
CREATE TABLE clip_related_phrases (
  id      TEXT PRIMARY KEY,
  clip_id TEXT NOT NULL REFERENCES clips(id) ON DELETE CASCADE,
  phrase  TEXT NOT NULL
);

-- saved_clips
CREATE TABLE saved_clips (
  id         TEXT PRIMARY KEY,
  user_id    TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  clip_id    TEXT NOT NULL REFERENCES clips(id) ON DELETE CASCADE,
  key_phrase TEXT,
  saved_at   TIMESTAMPTZ DEFAULT NOW(),
  note       TEXT
);

-- review_sessions
CREATE TABLE review_sessions (
  id            TEXT PRIMARY KEY,
  user_id       TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  saved_clip_id TEXT NOT NULL REFERENCES saved_clips(id) ON DELETE CASCADE,
  user_answer   TEXT,
  ai_score      FLOAT,
  ai_feedback   TEXT,
  reviewed_at   TIMESTAMPTZ DEFAULT NOW()
);