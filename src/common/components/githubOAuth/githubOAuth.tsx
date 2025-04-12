"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FC, useEffect } from "react";
import { setLoggedIn } from "store/services/slices";
import { authApi, useMeQuery } from "store/services/api/auth";
import { handleErrors } from "common/utils";
import { useAppDispatch } from "common/hooks";

export const GithubOAuth: FC<Props> = ({ redirect }) => {
  const { refetch } = useMeQuery();
  const params = useSearchParams();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const accessToken = params.get("accessToken");

  useEffect(() => {
    if (accessToken) {
      try {
        localStorage.setItem("accessToken", accessToken);
        dispatch(setLoggedIn({ isLoggedIn: true }));
        dispatch(authApi.util.resetApiState());
        refetch();
        router.push(redirect);
      } catch (error) {
        handleErrors(error, dispatch);
        dispatch(setLoggedIn({ isLoggedIn: false }));
      }
    }
  }, [accessToken, dispatch, redirect, refetch, router]);

  return null;
};

type Props = {
  redirect: string;
};
