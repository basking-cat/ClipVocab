"use client";

import { ReactNode } from "react";
import styles from "./FilterModal.module.scss";
import { ModalWindow } from "./ModalWindow";
import { useState } from "react";

type Option = {
  id: string;
  label: string;
  checked: boolean;
};

type FilterModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  applyFilters: () => void;
  clearFilters: () => void;
  categories: Option[];
  setCategories: (v: Option[]) => void;
  stylesOpt: Option[];
  setStylesOpt: (v: Option[]) => void;
  levels: Option[];
  setLevels: (v: Option[]) => void;
  range: [number, number];
  setRange: (v: [number, number]) => void;
};

export const FilterModal = ({
  isOpen,
  closeModal,
  applyFilters,
  clearFilters,
  categories,
  setCategories,
  stylesOpt,
  setStylesOpt,
  levels,
  setLevels,
  range,
  setRange,
}: FilterModalProps) => {
  const toggle = (
    list: Option[],
    setter: (v: Option[]) => void,
    id: string
  ) => {
    setter(list.map((o) => (o.id === id ? { ...o, checked: !o.checked } : o)));
  };

  return (
    <ModalWindow
      isOpen={isOpen}
      closeModal={closeModal}
      size="largest"
      height="636px"
    >
      <form
        className={styles.filterContent}
        onSubmit={(e) => {
          e.preventDefault();
          applyFilters();
        }}
      >
        <h2 className={styles.filterHeading}>Filters</h2>

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

        <fieldset className={styles.filterGroup}>
          <legend>Video Length</legend>
          <div className={styles.rangeWrapper}>
            <input
              type="range"
              min={0}
              max={80}
              step={1}
              value={range[0]}
              onChange={(e) => setRange([Number(e.target.value), range[1]])}
              className={styles.range}
            />
          </div>
          <div className={styles.rangeLabels}>
            <span>{range[0]}&nbsp;sec</span>
          </div>
        </fieldset>

        <fieldset className={styles.filterGroup}>
          <legend>English Style</legend>
          <label>
            <input type="checkbox" name="style" value="casual" defaultChecked />{" "}
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
        <fieldset className={styles.filterGroup}>
          <legend>English Level</legend>
          {levels.map((l) => (
            <label key={l.id}>
              <input
                type="checkbox"
                checked={l.checked}
                onChange={() => toggle(levels, setLevels, l.id)}
              />
              {l.label}
            </label>
          ))}
        </fieldset>

        <hr className={styles.divider} />

        <div className={styles.filterActions}>
          <button
            type="button"
            className={styles.clearBtn}
            onClick={clearFilters}
          >
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
  );
};
