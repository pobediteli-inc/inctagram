"use client";

import s from "./pagination.module.scss";
import { clsx } from "clsx";
import SvgArrowIosBack from "assets/icons/ArrowIosBack";
import SvgArrowIosForward from "assets/icons/ArrowIosForward";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { generatePageNumbers } from "./methods/generatePageNumbers";

export type PaginationProps = {
  totalPages: number;
};

export const Pagination = ({ totalPages }: PaginationProps) => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("size")) || 10;
  const lastPage = Math.ceil(totalPages / pageSize);

  const pageNumbers = generatePageNumbers({ currentPage, pageSize, totalPages });

  const handlePageChange = (page: number) => {
    router.push(`?page=${page}&size=${pageSize}`);
  };

  const onPageSizeChange = (size: number = pageSize) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    params.set("size", size.toString());
    router.push(`?${params}`);
  };

  return (
    <div className={s.paginationContainer}>
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={clsx(s.navigationButton, { [s.disabled]: currentPage === 1 })}
      >
        <SvgArrowIosBack width={16} height={16} color={currentPage === 1 ? "var(--dark-100)" : "var(--light-100)"} />
      </button>

      {pageNumbers.map((page, index) => (
        <React.Fragment key={index}>
          {typeof page === "number" ? (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={clsx(s.basicButton, { [s.active]: page === currentPage }, "typography-variant--regular_14")}
            >
              {page}
            </button>
          ) : (
            <span className={s.spanContainer}>{page}</span>
          )}
        </React.Fragment>
      ))}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === lastPage}
        className={clsx(s.navigationButton, { [s.disabled]: currentPage === totalPages })}
      >
        <SvgArrowIosForward
          width={16}
          height={16}
          color={currentPage === lastPage ? "var(--dark-100)" : "var(--light-100)"}
        />
      </button>

      <div className={clsx(s.selectContainer, "typography-variant--regular_14")}>
        <span>Show</span>
        <select className={s.selectBox} value={pageSize} onChange={(e) => onPageSizeChange(Number(e.target.value))}>
          {[10, 20, 30, 50, 100].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
        <span>on page</span>
      </div>
    </div>
  );
};
