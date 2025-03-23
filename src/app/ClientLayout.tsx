"use client";
import { ReactNode } from "react";
import { Header, ProgressBar } from "common/components";
import s from "./page.module.css";
import { Toast } from "common/components/toast/toast";
import { useAppSelector } from "common/hooks/useAppSelector";
import { selectStatus, setStatus } from "features/slices/status/statusSlice";
import { useAppDispatch } from "common/hooks/useAppDispatch";

export default function ClientLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const { status, message } = useAppSelector(selectStatus);
  const dispatch = useAppDispatch();

  const handleClose = () => dispatch(setStatus({ status: null, message: null }));

  return (
    <>
      <Header />
      {status === "loading" && (
        <div className={s.progressBar}>
          <ProgressBar />
        </div>
      )}
      <main className={s.main}>{children}</main>
      {status && message && (
        <Toast type={status} message={message} open={!!status && !!message} setOpen={handleClose} />
      )}
    </>
  );
}
