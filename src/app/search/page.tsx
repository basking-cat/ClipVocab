"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "./page.module.scss";
import { mockVideos } from "@/data/mockVideos";

type Props = {
  searchParams: { q?: string; page?: string };
};

export default function SearchResults({ searchParams }: Props) {
  const query = (searchParams.q || "").trim();
  if (!query) notFound();

  const results = mockVideos.filter((v) =>
    v.title.toLowerCase().includes(query.toLowerCase())
  );

  const page = Number(searchParams.page || 1);
  const pageSize = 12;
  const totalPages = Math.max(1, Math.ceil(results.length / pageSize));
  const pageVideos = results.slice((page - 1) * pageSize, page * pageSize);

  return (
    <main className={styles.container}>
      <h2 className={styles.heading}>Top results for &ldquo;{query}&rdquo;</h2>

      <div className={styles.videoGrid}>
        {pageVideos.length === 0 && <p>No results</p>}

        {pageVideos.map((video) => (
          <Link
            key={video.id}
            href={`/video/${video.id}`}
            className={styles.card}
          >
            <div className={styles.thumbnailWrapper}>
              <img
                src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`}
                alt={video.title}
                className={styles.thumbnail}
              />
              <span className={styles.clipRange}>{video.clipRange}</span>
            </div>

            <div className={styles.cardBody}>
              <p className={styles.videoTitle}>{video.title}</p>
              <p className={styles.meta}>
                {video.channel} &nbsp;•&nbsp; {video.views}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {totalPages > 1 && (
        <nav className={styles.pagination}>
          <Link
            href={`/search?q=${encodeURIComponent(query)}&page=${page - 1}`}
            className={styles.pageBtn}
            aria-disabled={page === 1}
          >
            &lt;
          </Link>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <Link
              key={n}
              href={`/search?q=${encodeURIComponent(query)}&page=${n}`}
              className={`${styles.pageBtn} ${n === page && styles.active}`}
            >
              {n}
            </Link>
          ))}
          <Link
            href={`/search?q=${encodeURIComponent(query)}&page=${page + 1}`}
            className={styles.pageBtn}
            aria-disabled={page === totalPages}
          >
            &gt;
          </Link>
        </nav>
      )}
    </main>
  );
}
