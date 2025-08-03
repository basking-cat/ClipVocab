"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { SlidersHorizontal } from "lucide-react";
import styles from "./page.module.scss";
import { ModalWindow } from "@/stories/ModalWindow";

const mockVideos = [
  {
    id: "ed-sheeran-shape-of-you",
    videoId: "JGwWNGJdvx8",
    title: "Ed Sheeran – Shape of You (Official Music Video)",
    channel: "Ed Sheeran",
    views: "6.4 B views",
    clipRange: "0:12 – 0:30",
  },
  {
    id: "saweetie-closer",
    videoId: "7W3uE2q7y2Y",
    title: "Saweetie – Closer (feat. H.E.R.) [Official Music Video]",
    channel: "Official Saweetie",
    views: "32 M views",
    clipRange: "0:24 – 0:48",
  },
  {
    id: "dua-lipa-break-my-heart",
    videoId: "Nj2U6rhnucI",
    title: "Dua Lipa – Break My Heart (Official Video)",
    channel: "Dua Lipa",
    views: "638 M views",
    clipRange: "1:06 – 1:28",
  },
  {
    id: "ed-sheeran-shape-of-you-2",
    videoId: "JGwWNGJdvx8",
    title: "Ed Sheeran – Shape of You (Official Music Video)",
    channel: "Ed Sheeran",
    views: "6.4 B views",
    clipRange: "0:12 – 0:30",
  },
  {
    id: "saweetie-closer-2",
    videoId: "7W3uE2q7y2Y",
    title: "Saweetie – Closer (feat. H.E.R.) [Official Music Video]",
    channel: "Official Saweetie",
    views: "32 M views",
    clipRange: "0:24 – 0:48",
  },
  {
    id: "dua-lipa-break-my-heart-2",
    videoId: "Nj2U6rhnucI",
    title: "Dua Lipa – Break My Heart (Official Video)",
    channel: "Dua Lipa",
    views: "638 M views",
    clipRange: "1:06 – 1:28",
  },
  {
    id: "ed-sheeran-shape-of-you-3",
    videoId: "JGwWNGJdvx8",
    title: "Ed Sheeran – Shape of You (Official Music Video)",
    channel: "Ed Sheeran",
    views: "6.4 B views",
    clipRange: "0:12 – 0:30",
  },
  {
    id: "saweetie-closer-3",
    videoId: "7W3uE2q7y2Y",
    title: "Saweetie – Closer (feat. H.E.R.) [Official Music Video]",
    channel: "Official Saweetie",
    views: "32 M views",
    clipRange: "0:24 – 0:48",
  },
  {
    id: "dua-lipa-break-my-heart-3",
    videoId: "Nj2U6rhnucI",
    title: "Dua Lipa – Break My Heart (Official Video)",
    channel: "Dua Lipa",
    views: "638 M views",
    clipRange: "1:06 – 1:28",
  },
];

export default function ClipVocabLanding() {
  const [query, setQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  // [min, max] video length in seconds
  const [videoLength, setVideoLength] = useState<[number, number]>([0, 80]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Searching for:", query);
  };

  return (
    <main className={styles.container}>
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>
          Learn real English
          <br /> from the videos you love
        </h1>
        <p className={styles.heroSub}>
          Discover powerful vocabulary through real English in context.
        </p>
      </section>
      <form className={styles.searchForm} onSubmit={handleSubmit}>
        <input
          className={styles.searchInput}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="write the vocabulary"
          aria-label="Search vocabulary"
        />
        <button
          className={styles.filterBtn}
          type="button"
          aria-label="Filter options"
          onClick={() => setIsFilterOpen(true)}
        >
          <SlidersHorizontal size={20} />
        </button>
        <button className={styles.searchBtn} type="submit" aria-label="Search">
          <Search size={20} />
        </button>
      </form>
      <ModalWindow
        isOpen={isFilterOpen}
        closeModal={() => setIsFilterOpen(false)}
        size="largest"
        height="636px"
      >
        <form
          className={styles.filterContent}
          onSubmit={(e) => {
            e.preventDefault();
            // TODO: wire these values into your search query
            setIsFilterOpen(false);
          }}
        >
          <h2 className={styles.filterHeading}>Filters</h2>

          {/* ---------- Category ---------- */}
          <fieldset className={styles.filterGroup}>
            <legend>Category</legend>
            <label>
              <input type="checkbox" name="category" value="news" /> NEWS
            </label>
            <label>
              <input type="checkbox" name="category" value="interview" />{" "}
              Interview, TED
            </label>
            <label>
              <input type="checkbox" name="category" value="music" /> Music
            </label>
            <label>
              <input type="checkbox" name="category" value="vlogs" /> Vlogs
            </label>
            <label>
              <input type="checkbox" name="category" value="game" /> Game
              Commentary
            </label>
          </fieldset>

          {/* ---------- Video Length ---------- */}
          <fieldset className={styles.filterGroup}>
            <legend>Video Length</legend>
            <div className={styles.rangeWrapper}>
              {/* Min thumb */}
              <input
                type="range"
                min={0}
                max={80}
                step={1}
                value={videoLength[0]}
                onChange={(e) =>
                  setVideoLength([
                    Math.min(Number(e.target.value), videoLength[1] - 1),
                    videoLength[1],
                  ])
                }
                className={`${styles.range} ${styles.rangeMin}`}
              />
              {/* Max thumb */}
              <input
                type="range"
                min={0}
                max={80}
                step={1}
                value={videoLength[1]}
                onChange={(e) =>
                  setVideoLength([
                    videoLength[0],
                    Math.max(Number(e.target.value), videoLength[0] + 1),
                  ])
                }
                className={`${styles.range} ${styles.rangeMax}`}
              />
            </div>
            <div className={styles.rangeLabels}>
              <span>{videoLength[0]}&nbsp;sec</span>
              <span>{videoLength[1]}&nbsp;sec</span>
            </div>
          </fieldset>

          {/* ---------- English Style ---------- */}
          <fieldset className={styles.filterGroup}>
            <legend>English Style</legend>
            <label>
              <input
                type="checkbox"
                name="style"
                value="casual"
                defaultChecked
              />{" "}
              Casual
            </label>
            <label>
              <input type="checkbox" name="style" value="formal" /> Formal
            </label>
            <label>
              <input type="checkbox" name="style" value="business" /> Business
            </label>
            <label>
              <input type="checkbox" name="style" value="native" /> Native‑like
            </label>
            <label>
              <input type="checkbox" name="style" value="slang" /> Slang / Youth
            </label>
          </fieldset>

          {/* ---------- English Level ---------- */}
          <fieldset className={styles.filterGroup}>
            <legend>English Level</legend>
            <label>
              <input
                type="checkbox"
                name="level"
                value="beginner"
                defaultChecked
              />{" "}
              Beginner
            </label>
            <label>
              <input type="checkbox" name="level" value="intermediate" />{" "}
              Intermediate
            </label>
            <label>
              <input type="checkbox" name="level" value="advanced" /> Advanced
            </label>
          </fieldset>

          <hr className={styles.divider} />

          {/* ---------- Action Buttons ---------- */}
          <div className={styles.filterActions}>
            <button type="button" className={styles.clearBtn}>
              CLEAR
            </button>
            <button type="button" className={styles.useSettingsBtn}>
              Use Your Settings
            </button>
            <button type="submit" className={styles.applyBtn}>
              APPLY FILTERS
            </button>
          </div>
        </form>
      </ModalWindow>

      <section className={styles.recommendations}>
        <h2 className={styles.sectionHeading}>You might like</h2>

        <div className={styles.videoGrid}>
          {mockVideos.map((video) => (
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
      </section>
    </main>
  );
}
