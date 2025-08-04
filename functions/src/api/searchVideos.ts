import * as functions from "firebase-functions";
import { google, youtube_v3 } from "googleapis";
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "/../../.env" }); // ← Cloud 上は不要

const youtube = google.youtube({
  version: "v3",
  auth: process.env.YOUTUBE_API_KEY,
});

/**
 * GET https://{REGION}-{PROJECT}.cloudfunctions.net/searchVideos?kw=apple
 *   &max=25&caption=closedCaption
 */
export const searchVideos = functions
  .region("asia-northeast1")
  // 戻り値を Promise<void> と明示
  .https.onRequest(async (req, res): Promise<void> => {
    // --- ① パラメータ解析
    const kw = ((req.query.kw as string) || "").trim().toLowerCase();
    if (!kw) {
      res.status(400).json({ error: "kw (keyword) is required" });
      return; // ← res.*() 後は void で早期終了
    }
    const max = Math.min(Number(req.query.max) || 25, 50);
    const caption = (req.query.caption as string) || "any"; // any / closedCaption

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
      return; // ← 成功時も void を返して終了
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "YouTube API error" });
      return; // ← エラー時も同様
    }
  });
