"use client";

import { ReactNode } from "react";
import { GithubOAuth, GoogleOAuth, Header, ProgressBar, Sidebar } from "common/components";
import s from "./page.module.css";
import { Toast } from "common/components/toast/toast";
import { useAppSelector } from "common/hooks/useAppSelector";
import { clearStatus, selectStatus } from "store/services/slices/statusSlice";
import { useAppDispatch } from "common/hooks/useAppDispatch";
import { selectIsLoggedIn } from "store/services/slices";

export default function ClientLayout({ children }: Readonly<{ children: ReactNode }>) {
  const { status, message } = useAppSelector(selectStatus);
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const handleClose = () => dispatch(clearStatus({ status: null, message: null }));

  return (
    <>
      <GoogleOAuth redirect={"/"} />
      <GithubOAuth redirect={"/"} />
      <Header />
      {status === "loading" && (
        <div className={s.progressBar}>
          <ProgressBar />
        </div>
      )}
      <div className={s.wrapper}>
        {isLoggedIn && <Sidebar />}
        <main className={s.children}>{children}</main>
      </div>
      {status && message && (
        <Toast type={status} message={message} open={!!status && !!message} setOpen={handleClose} />
      )}
    </>
  );
}
