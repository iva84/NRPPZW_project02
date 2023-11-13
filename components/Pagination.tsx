"use client";

import { MouseEvent } from "react";
import styles from "./Pagination.module.css";

interface PaginationProps {
  page: number;
  isLastPage: boolean;
  onPreviousClick: () => void;
  onNextClick: () => void;
}

export default function Pagination({
  page,
  isLastPage,
  onPreviousClick,
  onNextClick,
}: PaginationProps) {
  const handlePrevoiusClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (page > 0) {
      onPreviousClick();
    }
  };

  const handleNextClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isLastPage) {
      onNextClick();
    }
  };

  return (
    <div className={styles["pagination"]}>
      <button onClick={handlePrevoiusClick} disabled={page <= 0}>
        Previous
      </button>
      <label className={styles["page-label"]}>{page}</label>
      <button onClick={handleNextClick} disabled={isLastPage}>
        Next
      </button>
    </div>
  );
}
