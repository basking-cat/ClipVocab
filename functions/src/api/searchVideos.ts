import * as functions from "firebase-functions";
import { google, youtube_v3 } from "googleapis";
import { defineSecret } from "firebase-functions/params";

// Secret 定義
const youtubeApiKey = defineSecret("YOUTUBE_API_KEY");

export const searchVideos = functions
  .runWith({ secrets: ["YOUTUBE_API_KEY"] })
  .region("asia-northeast1")
  .https.onRequest(async (req, res): Promise<void> => {
    // --- YouTube API 初期化
    const youtube = google.youtube({
      version: "v3",
      auth: youtubeApiKey.value(),
    });

    // --- ① パラメータ解析
    const kw = ((req.query.kw as string) || "").trim().toLowerCase();
    if (!kw) {
      res.status(400).json({ error: "kw (keyword) is required" });
      return;
    }
    const max = Math.min(Number(req.query.max) || 25, 50);
    const caption = (req.query.caption as string) || "any";

    try {
      // --- ② YouTube search.list 呼び出し
      const resp = await youtube.search.list({
        part: ["id", "snippet"],
        q: kw,
        type: ["video"],
        videoCaption: caption,
        maxResults: max,
        fields:
          "items(id/videoId,snippet/title,snippet/channelTitle,snippet/thumbnails/default/url)",
      } as youtube_v3.Params$Resource$Search$List);

      // --- ③ レスポンス整形
      const videos =
        resp.data.items?.map((it) => ({
          videoId: it.id?.videoId,
          title: it.snippet?.title,
          channel: it.snippet?.channelTitle,
          thumb: it.snippet?.thumbnails?.default?.url,
        })) ?? [];

      res.set("Cache-Control", "public, max-age=300, s-maxage=600");
      res.json({ kw, videos });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "YouTube API error" });
    }
  });
