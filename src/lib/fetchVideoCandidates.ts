// src/lib/fetchVideoCandidates.ts
export async function fetchVideoCandidates(
  keyword: string,
  max: number = 25
): Promise<
  {
    videoId: string;
    title: string;
    channel: string;
    thumb: string;
  }[]
> {
  if (!keyword.trim()) return [];

  const res = await fetch(
    `https://asia-northeast1-<your-project-id>.cloudfunctions.net/searchVideos?kw=${encodeURIComponent(keyword)}&max=${max}`,
    { next: { revalidate: 60 } } // ← ISR: 60 秒キャッシュ
  );

  if (!res.ok) throw new Error("Search API failed");

  const data = await res.json();
  return data.videos;
}
