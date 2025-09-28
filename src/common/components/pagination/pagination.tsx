"use client";

import s from "./pagination.module.scss";
import { clsx } from "clsx";
import SvgArrowIosBack from "assets/icons/ArrowIosBack";
import SvgArrowIosForward from "assets/icons/ArrowIosForward";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useMemo } from "react";
import { Typography } from "common/components/typography/typography";
import { generateVisiblePages } from "common/utils/generateVisiblePages";

export type PaginationProps = {
  totalItems: number;
  pageSize: number;
};

export const Pagination = ({ totalItems, pageSize }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const lastPage = Math.ceil(totalItems / pageSize);

  const updateParams = (page: number, size: number = pageSize) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    params.set("size", size.toString());
    router.push(`?${params.toString()}`);
  };

  const handlePageChange = (page: number) => {
    updateParams(Math.max(1, Math.min(page, lastPage)));
  };

  const onPageSizeChange = (size: number) => {
    updateParams(1, size);
  };

  const visiblePages = useMemo(() => generateVisiblePages(currentPage, lastPage), [currentPage, lastPage]);

  return (
    <div className={s.paginationContainer}>
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className={clsx(s.navigationButton, { [s.disabled]: currentPage <= 1 })}
      >
        <SvgArrowIosBack width={16} height={16} color={currentPage <= 1 ? "var(--dark-100)" : "var(--light-100)"} />
      </button>

      {visiblePages.map((page, index) =>
        page === "..." ? (
          <Typography variant="regular_14" color="light" key={`dots-${index}`} className={s.ellipsis}>
            ...
          </Typography>
        ) : (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={clsx(s.basicButton, { [s.active]: page === currentPage })}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= lastPage}
        className={clsx(s.navigationButton, { [s.disabled]: currentPage >= lastPage })}
      >
        <SvgArrowIosForward
          width={16}
          height={16}
          color={currentPage >= lastPage ? "var(--dark-100)" : "var(--light-100)"}
        />
      </button>

      <div className={s.selectContainer}>
        <Typography variant="regular_14">Show</Typography>
        <select className={s.selectBox} value={pageSize} onChange={(e) => onPageSizeChange(Number(e.target.value))}>
          {[10, 20, 30, 50, 100].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
        <Typography variant="regular_14">on page</Typography>
      </div>
    </div>
  );
};
