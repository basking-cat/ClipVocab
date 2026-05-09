-- ============================================================
-- ClipVocab - RLS Policies
-- ============================================================

-- ----------------------------------------
-- users
-- ユーザーは自分のデータのみ読み書き可能
-- ----------------------------------------
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users_select_own" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "users_insert_own" ON users
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "users_update_own" ON users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "users_delete_own" ON users
  FOR DELETE USING (auth.uid() = id);

-- ----------------------------------------
-- preferences
-- ユーザーは自分のpreferencesのみ読み書き可能
-- ----------------------------------------
ALTER TABLE preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "preferences_select_own" ON preferences
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "preferences_insert_own" ON preferences
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "preferences_update_own" ON preferences
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "preferences_delete_own" ON preferences
  FOR DELETE USING (auth.uid() = user_id);

-- ----------------------------------------
-- preference_topics
-- preferencesを経由して自分のものだけ読み書き可能
-- ----------------------------------------
ALTER TABLE preference_topics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "preference_topics_select_own" ON preference_topics
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM preferences
      WHERE preferences.id = preference_topics.preference_id
        AND preferences.user_id = auth.uid()
    )
  );

CREATE POLICY "preference_topics_insert_own" ON preference_topics
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM preferences
      WHERE preferences.id = preference_topics.preference_id
        AND preferences.user_id = auth.uid()
    )
  );

CREATE POLICY "preference_topics_update_own" ON preference_topics
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM preferences
      WHERE preferences.id = preference_topics.preference_id
        AND preferences.user_id = auth.uid()
    )
  );

CREATE POLICY "preference_topics_delete_own" ON preference_topics
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM preferences
      WHERE preferences.id = preference_topics.preference_id
        AND preferences.user_id = auth.uid()
    )
  );

-- ----------------------------------------
-- videos
-- 全員が読める、書き込みはシステムのみ
-- ----------------------------------------
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "videos_public_read" ON videos
  FOR SELECT USING (true);

-- ----------------------------------------
-- clips
-- 全員が読める、書き込みはシステムのみ
-- ----------------------------------------
ALTER TABLE clips ENABLE ROW LEVEL SECURITY;

CREATE POLICY "clips_public_read" ON clips
  FOR SELECT USING (true);

-- ----------------------------------------
-- clip_related_phrases
-- 全員が読める、書き込みはシステムのみ
-- ----------------------------------------
ALTER TABLE clip_related_phrases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "clip_related_phrases_public_read" ON clip_related_phrases
  FOR SELECT USING (true);

-- ----------------------------------------
-- saved_clips
-- ユーザーは自分のsaved_clipsのみ読み書き可能
-- ----------------------------------------
ALTER TABLE saved_clips ENABLE ROW LEVEL SECURITY;

CREATE POLICY "saved_clips_select_own" ON saved_clips
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "saved_clips_insert_own" ON saved_clips
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "saved_clips_update_own" ON saved_clips
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "saved_clips_delete_own" ON saved_clips
  FOR DELETE USING (auth.uid() = user_id);

-- ----------------------------------------
-- review_sessions
-- ユーザーは自分のreview_sessionsのみ読み書き可能
-- ----------------------------------------
ALTER TABLE review_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "review_sessions_select_own" ON review_sessions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "review_sessions_insert_own" ON review_sessions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "review_sessions_update_own" ON review_sessions
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "review_sessions_delete_own" ON review_sessions
  FOR DELETE USING (auth.uid() = user_id);