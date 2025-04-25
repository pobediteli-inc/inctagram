"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FC, useEffect } from "react";
import { selectStatus, setLoggedIn, setStatus } from "store/services/slices";
import { authApi, useMeQuery } from "store/services/api/auth";
import { handleErrors } from "common/utils";
import { useAppDispatch, useAppSelector } from "common/hooks";

export const GithubOAuth: FC<Props> = ({ redirect }) => {
  const { refetch } = useMeQuery();
  const params = useSearchParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectStatus);

  const accessToken = params.get("accessToken");

  useEffect(() => {
    if (accessToken) {
      try {
        localStorage.setItem("accessToken", accessToken);
        dispatch(setLoggedIn({ isLoggedIn: true }));
        dispatch(authApi.util.resetApiState());
        refetch();
        router.push(redirect);
        if (status.status === "success")
          dispatch(setStatus({ status: "success", message: "Successfully logged in via github account." }));
      } catch (error) {
        handleErrors(error, dispatch);
        dispatch(setLoggedIn({ isLoggedIn: false }));
      }
    }
  }, [accessToken, dispatch, redirect, refetch, router, status.status]);

  return null;
};

type Props = {
  redirect: string;
};
