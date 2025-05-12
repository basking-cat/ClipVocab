"use client";
import { useState } from "react";
import styles from "./Pagination.module.scss";
import Image from "next/image";

type PaginationPorps = {
  initialPage: number;
  limit: number; // 一ページに表示する要素の数
  count: number; // 要素の数
};

/**
 * ページネーションコンポーネントの作成
 *
 * @description
 * ページネーションを表示するコンポーネント
 *
 *
 * @example
 * // 基本的な使用方法
 * <Pagination initialPage={3} limit={3} count={150}' />
 *
 * @param props - コンポーネントのプロパティ
 * @param props.initialPage - 初期ページ
 * @param props.limit - 一ページに表示する要素の数
 * @param props.count - 要素の数
 *
 */

export const Pagination = ({ initialPage, limit, count }: PaginationPorps) => {
  const totalPages = Math.ceil(count / limit); // Math.ceil = 与えられた数値を最も近い大きな整数に切り上げる
  const [currentPage, setCurrentPage] = useState(initialPage);

  let pagesToShow: (number | "...")[] = [];
  if (totalPages <= 5) {
    pagesToShow = Array.from({ length: totalPages }, (_, i) => i + 1);
  } else {
    if (currentPage <= 3) {
      pagesToShow = [1, 2, 3, "...", totalPages];
    } else if (currentPage <= totalPages - 3) {
      pagesToShow = [
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages,
      ];
    } else {
      pagesToShow = [1, "...", totalPages - 2, totalPages - 1, totalPages];
    }
  }

  return (
    <div>
      <button
        className={`${styles.prevButton} ${
          currentPage === 1 ? styles.cursorNotAllowed : ""
        }`}
        onClick={() => {
          if (currentPage > 1) setCurrentPage(currentPage - 1);
        }}
      >
        <Image
          className={styles.chevron_forward}
          src="/images/chevron_forward_black.svg"
          alt="logo"
          width={12}
          height={8}
        ></Image>
      </button>

      {pagesToShow.map((page, index) =>
        page === "..." ? (
          <span key={`ellipsis-${index}`} className={styles.ellipsis}>
            ...
          </span>
        ) : (
          <button
            key={page}
            className={`${styles.pageButton} ${
              page === currentPage ? styles.active : ""
            }`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        )
      )}
      <button
        className={`${styles.nextButton} ${
          currentPage === totalPages ? styles.cursorNotAllowed : ""
        }`}
        onClick={() => {
          if (currentPage < totalPages) setCurrentPage(currentPage + 1);
        }}
      >
        <Image
          src="/images/chevron_forward_black.svg"
          alt="logo"
          width={12}
          height={8}
        ></Image>
      </button>
    </div>
  );
};
