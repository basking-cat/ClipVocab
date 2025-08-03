"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import styles from "./video.module.scss";
import { mockVideos } from "@/data/mockVideos";

type Props = { params: { id: string } };

export default function VideoDetail({ params }: Props) {
  const video = mockVideos.find((v) => v.id === params.id);
  if (!video) notFound();

  return (
    <main className={styles.container}>\
      <Link href={`/search?q=premature`} className={styles.backLink}>
        &lt; Back to the search list for &quot;premature&quot;
      </Link>

      <section className={styles.topSection}>
        <img
          src={`https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`}
          alt={video.title}
          className={styles.heroThumb}
        />
        <aside className={styles.transBox}>
          <p className={styles.originalText}>
            regulators, RNA polymerase (RNAP) and gyrase.
          </p>
          <h3 className={styles.highlightText}>
            Our results suggest that operons’ responses are influenced by
            stress-related changes in <mark>premature</mark> elongation
            terminations and internal promoters’ activity
          </h3>
          <p className={styles.originalText}>
            Globally, this causes the responses of genes in the same operon to
            differ with the distance between them in a wave-like pattern.
          </p>
          <hr />
          <p className={styles.translationJa}>
            調節因子、RNAポリメラーゼ（RNAP）およびジャイレース。
          </p>
          <h3 className={styles.translationJa}>
            我々の結果は、オペロンの応答が、ストレスに関連した転写の
            <mark>早期終結</mark>や内部プロモーターの活性の変化に影響を
            受けることを示唆している。
          </h3>
          <p className={styles.translationJa}>
            全体として、これは同じオペロン内の遺伝子の応答が、互いの距離に
            応じて波のようなパターンで異なることを引き起こす。
          </p>
        </aside>
      </section>\
      <h2 className={styles.videoTitle}>{video.title}</h2>
      <p className={styles.meta}>
        {video.channel} &nbsp;•&nbsp; {video.views}
      </p>

      <section className={styles.otherSection}>
        <h3 className={styles.otherHeading}>Watch Other Videos</h3>
        <div className={styles.videoGrid}>
          {mockVideos.slice(0, 8).map((v) => (
            <Link key={v.id} href={`/video/${v.id}`} className={styles.card}>
              <img
                src={`https://img.youtube.com/vi/${v.videoId}/hqdefault.jpg`}
                className={styles.cardThumb}
                alt={v.title}
              />
              <p className={styles.cardTitle}>{v.title}</p>
              <p className={styles.cardMeta}>
                {v.channel} &nbsp;•&nbsp; {v.views}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
