// src/app/api/searchVideos/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const keyword = searchParams.get("kw");
  const max = Number(searchParams.get("max") || 25);

  if (!keyword) {
    return NextResponse.json({ videos: [] });
  }

  const dummy = Array.from({ length: Math.min(max, 5) }).map((_, i) => ({
    videoId: `video${i}`,
    title: `${keyword} video ${i}`,
    channel: `Channel ${i}`,
    thumb: `https://via.placeholder.com/320x180?text=${keyword}+${i}`,
  }));

  return NextResponse.json({ videos: dummy });
}
