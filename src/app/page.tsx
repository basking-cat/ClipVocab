"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { SlidersHorizontal } from "lucide-react";
import styles from "./page.module.scss";
import { FilterModal } from "@/stories/FilterModal";
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

  // --- filter modal state ---
  type Option = { id: string; label: string; checked: boolean };

  const [categories, setCategories] = useState<Option[]>([
    { id: "news", label: "NEWS", checked: false },
    { id: "interview", label: "Interview / TED", checked: false },
    { id: "music", label: "Music", checked: false },
    { id: "vlogs", label: "Vlogs", checked: false },
    { id: "game", label: "Game Commentary", checked: false },
  ]);

  const [stylesOpt, setStylesOpt] = useState<Option[]>([
    { id: "casual", label: "Casual", checked: true },
    { id: "formal", label: "Formal", checked: false },
    { id: "business", label: "Business", checked: false },
    { id: "native", label: "Native‑like", checked: false },
    { id: "slang", label: "Slang / Youth", checked: false },
  ]);
  const [levels, setLevels] = useState<Option[]>([
    { id: "beginner", label: "Beginner", checked: true },
    { id: "intermediate", label: "Intermediate", checked: false },
    { id: "advanced", label: "Advanced", checked: false },
  ]);

  // [min, max] in **minutes** for storybook; convert to sec if必要
  const [range, setRange] = useState<[number, number]>([0, 10]);

  /** apply filters from modal – TODO: integrate into search */
  const applyFilters = () => {
    console.log({ categories, stylesOpt, range });
    setIsFilterOpen(false);
  };

  /** clear all filter selections */
  const clearFilters = () => {
    setCategories(categories.map((c) => ({ ...c, checked: false })));
    setStylesOpt(stylesOpt.map((s) => ({ ...s, checked: false })));
    setLevels(levels.map((l) => ({ ...l, checked: false })));
    setRange([0, 10]);
  };

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
      <FilterModal
        isOpen={isFilterOpen}
        closeModal={() => setIsFilterOpen(false)}
        applyFilters={applyFilters}
        clearFilters={clearFilters}
        categories={categories}
        setCategories={setCategories}
        stylesOpt={stylesOpt}
        setStylesOpt={setStylesOpt}
        levels={levels}
        setLevels={setLevels}
        range={range}
        setRange={setRange}
      />

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
