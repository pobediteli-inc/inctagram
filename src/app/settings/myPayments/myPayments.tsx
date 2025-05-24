"use client";

import React, { useEffect, useState } from "react";
import { Pagination, Toast } from "common/components";
import { useRouter, useSearchParams } from "next/navigation";
import s from "./myPayments.module.css";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { PaymentsViewModel, useGetPaymentsQuery } from "store/services/api/payments";

const ITEMS_PER_PAGE = 10;

export const MyPayments = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("size")) || ITEMS_PER_PAGE;

  const { data, error, isError } = useGetPaymentsQuery();
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<"error" | "success" | "info" | "warning" | null>(null);

  function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
    return typeof error === "object" && error != null && "status" in error;
  }

  useEffect(() => {
    if (isError && error) {
      if (isFetchBaseQueryError(error) && error.status === 401) {
        setToastMessage("Session expired. Please login again.");
        setToastType("error");
        setToastOpen(true);
        setTimeout(() => router.push("/login"), 3000);
      } else {
        setToastMessage("Error loading payments. Please try again later.");
        setToastType("error");
        setToastOpen(true);
      }
    }

    if (data) {
      try {
        /* empty */
      } catch {
        setToastMessage("Error processing payments data.");
        setToastType("error");
        setToastOpen(true);
      }
    }
  }, [data, error, isError, router]);

  const totalItems = data?.length || 0;
  const totalPages = Math.ceil(totalItems / pageSize);

  const paginatedData = data?.slice((currentPage - 1) * pageSize, currentPage * pageSize) || [];

  return (
    <div className={s.wrapper}>
      <table className={s.table}>
        <thead>
          <tr>
            <th className={s.cell}>Date of Payment</th>
            <th className={s.cell}>End Date of Subscription</th>
            <th className={s.cell}>Price</th>
            <th className={s.cell}>Subscription</th>
            <th className={s.cell}>Payment Type</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((payment: PaymentsViewModel) => (
            <tr key={payment.subscriptionId}>
              <td className={s.cell}>{new Date(payment.dateOfPayment).toLocaleDateString()}</td>
              <td className={s.cell}>{new Date(payment.endDateOfSubscription).toLocaleDateString()}</td>
              <td className={s.cell}>${payment.price.toFixed(2)}</td>
              <td className={s.cell}>{payment.subscriptionType}</td>
              <td className={s.cell}>{payment.paymentType}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination totalPages={totalPages} />

      <Toast type={toastType} message={toastMessage} open={toastOpen} setOpen={setToastOpen} />
    </div>
  );
};
