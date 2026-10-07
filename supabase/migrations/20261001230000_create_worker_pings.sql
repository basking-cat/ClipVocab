-- ============================================================
-- worker_pings
-- Fargate, Supabase, SQS 間のフロー確認用
-- 読み取りは公開し、書き込みは postgres ロール（RLS をパスできる）からのみ。
-- ============================================================

CREATE TABLE worker_pings (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_type   TEXT NOT NULL,
  payload    TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE worker_pings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "worker_pings_public_read" ON worker_pings
  FOR SELECT USING (true);

ALTER PUBLICATION supabase_realtime ADD TABLE worker_pings;
