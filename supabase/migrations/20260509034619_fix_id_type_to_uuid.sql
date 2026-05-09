-- ============================================================
-- ClipVocab - Fix id columns to UUID type
-- Drop FK constraints → change types → re-add FK constraints
-- ============================================================

-- Drop FK constraints
ALTER TABLE preferences DROP CONSTRAINT preferences_user_id_fkey;
ALTER TABLE preference_topics DROP CONSTRAINT preference_topics_preference_id_fkey;
ALTER TABLE clips DROP CONSTRAINT clips_video_id_fkey;
ALTER TABLE clip_related_phrases DROP CONSTRAINT clip_related_phrases_clip_id_fkey;
ALTER TABLE saved_clips DROP CONSTRAINT saved_clips_user_id_fkey;
ALTER TABLE saved_clips DROP CONSTRAINT saved_clips_clip_id_fkey;
ALTER TABLE review_sessions DROP CONSTRAINT review_sessions_user_id_fkey;
ALTER TABLE review_sessions DROP CONSTRAINT review_sessions_saved_clip_id_fkey;

-- Change all id columns to UUID
ALTER TABLE users ALTER COLUMN id TYPE UUID USING id::UUID;
ALTER TABLE preferences ALTER COLUMN id TYPE UUID USING id::UUID;
ALTER TABLE preferences ALTER COLUMN user_id TYPE UUID USING user_id::UUID;
ALTER TABLE preference_topics ALTER COLUMN id TYPE UUID USING id::UUID;
ALTER TABLE preference_topics ALTER COLUMN preference_id TYPE UUID USING preference_id::UUID;
ALTER TABLE videos ALTER COLUMN id TYPE UUID USING id::UUID;
ALTER TABLE clips ALTER COLUMN id TYPE UUID USING id::UUID;
ALTER TABLE clips ALTER COLUMN video_id TYPE UUID USING video_id::UUID;
ALTER TABLE clip_related_phrases ALTER COLUMN id TYPE UUID USING id::UUID;
ALTER TABLE clip_related_phrases ALTER COLUMN clip_id TYPE UUID USING clip_id::UUID;
ALTER TABLE saved_clips ALTER COLUMN id TYPE UUID USING id::UUID;
ALTER TABLE saved_clips ALTER COLUMN user_id TYPE UUID USING user_id::UUID;
ALTER TABLE saved_clips ALTER COLUMN clip_id TYPE UUID USING clip_id::UUID;
ALTER TABLE review_sessions ALTER COLUMN id TYPE UUID USING id::UUID;
ALTER TABLE review_sessions ALTER COLUMN user_id TYPE UUID USING user_id::UUID;
ALTER TABLE review_sessions ALTER COLUMN saved_clip_id TYPE UUID USING saved_clip_id::UUID;

-- Re-add FK constraints
ALTER TABLE preferences ADD CONSTRAINT preferences_user_id_fkey
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

ALTER TABLE preference_topics ADD CONSTRAINT preference_topics_preference_id_fkey
  FOREIGN KEY (preference_id) REFERENCES preferences(id) ON DELETE CASCADE;

ALTER TABLE clips ADD CONSTRAINT clips_video_id_fkey
  FOREIGN KEY (video_id) REFERENCES videos(id) ON DELETE CASCADE;

ALTER TABLE clip_related_phrases ADD CONSTRAINT clip_related_phrases_clip_id_fkey
  FOREIGN KEY (clip_id) REFERENCES clips(id) ON DELETE CASCADE;

ALTER TABLE saved_clips ADD CONSTRAINT saved_clips_user_id_fkey
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

ALTER TABLE saved_clips ADD CONSTRAINT saved_clips_clip_id_fkey
  FOREIGN KEY (clip_id) REFERENCES clips(id) ON DELETE CASCADE;

ALTER TABLE review_sessions ADD CONSTRAINT review_sessions_user_id_fkey
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

ALTER TABLE review_sessions ADD CONSTRAINT review_sessions_saved_clip_id_fkey
  FOREIGN KEY (saved_clip_id) REFERENCES saved_clips(id) ON DELETE CASCADE;