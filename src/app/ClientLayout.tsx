"use client";
import { ReactNode } from "react";
import { Header, ProgressBar } from "common/components";
import s from "./page.module.css";
import { Toast } from "common/components/toast/toast";
import { useAppSelector } from "common/hooks/useAppSelector";
import { selectError, selectStatus } from "features/slices/status/statusSlice";

export default function ClientLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const status = useAppSelector(selectStatus);
  const errorMessage = useAppSelector(selectError);

  return (
    <>
      <Header />
      {status === "loading" && (
        <div className={s.progressBar}>
          <ProgressBar />
        </div>
      )}
      <main className={s.main}>{children}</main>
      {status && errorMessage && <Toast type={status} message={errorMessage} toastPosition={"left"} />}
    </>
  );
}
