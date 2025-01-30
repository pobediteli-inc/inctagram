"use client";
import { useState } from "react";

import styles from "./Pagination.module.scss";
import { clsx } from "clsx";
import SvgArrowIosBack from "common/components/SVGComponents/ArrowIosBack";
import SvgArrowIosForward from "common/components/SVGComponents/ArrowIosForward";
import { useRouter } from "next/navigation";

export type PaginationProps = {
  totalPages: number;
  currentPage: number;
};

const Pagination = ({ totalPages, currentPage }: PaginationProps) => {
  const router = useRouter();

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    router.push(`?page=${page}`);
  };

  return (
    <div className={styles.paginationContainer}>
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={clsx(styles.navigationButton, { [styles.disabled]: currentPage === 1 })}
      >
        <SvgArrowIosBack width={16} height={16} color={currentPage === 1 ? "var(--dark-100)" : "var(--light-100)"} />
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={clsx(
            styles.basicButton,
            { [styles.active]: page === currentPage },
            "typography-variant--regular_14"
          )}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={clsx(styles.navigationButton, { [styles.disabled]: currentPage === totalPages })}
      >
        <SvgArrowIosForward
          width={16}
          height={16}
          color={currentPage === totalPages ? "var(--dark-100)" : "var(--light-100)"}
        />
      </button>
    </div>
  );
};
export default Pagination;
