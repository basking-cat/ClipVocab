-- videos.id stores a YouTube video id, which is not a UUID.
-- clips.video_id references it, so that column has to use the same type.

ALTER TABLE clips DROP CONSTRAINT clips_video_id_fkey;

ALTER TABLE videos
  ALTER COLUMN id TYPE TEXT USING id::text;

ALTER TABLE clips
  ALTER COLUMN video_id TYPE TEXT USING video_id::text;

ALTER TABLE clips ADD CONSTRAINT clips_video_id_fkey
  FOREIGN KEY (video_id) REFERENCES videos(id) ON DELETE CASCADE;
