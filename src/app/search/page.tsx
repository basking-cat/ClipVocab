"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import styles from "./page.module.scss";
import { fetchVideoCandidates } from "@/lib/fetchVideoCandidates";

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = (searchParams.get("q") ?? "").trim();
  const page = parseInt(searchParams.get("page") ?? "1", 10);
  const pageSize = 12;

  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query) {
      setResults([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    fetchVideoCandidates(query, 50).then((data) => {
      setResults(data);
      setLoading(false);
    });
  }, [query]);

  const totalPages = Math.max(1, Math.ceil(results.length / pageSize));
  const pageVideos = results.slice((page - 1) * pageSize, page * pageSize);

  if (!query) {
    return (
      <main className={styles.container}>
        <p className={styles.center}>Please enter a keyword.</p>
      </main>
    );
  }

  return (
    <main className={styles.container}>
      <h1 className={styles.heading}>Top results for &ldquo;{query}&rdquo;</h1>

      <div className={styles.videoGrid}>
        {loading && <p>Loading...</p>}
        {!loading && pageVideos.length === 0 && <p>No results.</p>}
        {!loading &&
          pageVideos.map((video) => (
            <Link
              key={video.videoId}
              href={`/video/${video.videoId}`}
              className={styles.card}
            >
              <div className={styles.thumbnailWrapper}>
                <img
                  src={video.thumb}
                  alt={video.title}
                  className={styles.thumbnail}
                />
              </div>

              <div className={styles.cardBody}>
                <p className={styles.videoTitle}>{video.title}</p>
                <p className={styles.meta}>{video.channel}</p>
              </div>
            </Link>
          ))}
      </div>

      {totalPages > 1 && (
        <nav className={styles.pagination}>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <Link
              key={n}
              href={`/search?q=${encodeURIComponent(query)}&page=${n}`}
              className={`${styles.pageBtn} ${n === page ? styles.active : ""}`}
            >
              {n}
            </Link>
          ))}
        </nav>
      )}
    </main>
  );
}