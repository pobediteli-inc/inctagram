"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FC, useEffect } from "react";
import { setLoggedIn, setStatus } from "store/services/slices";
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
      const githubOAuth = async () => {
        try {
          localStorage.setItem("accessToken", accessToken);
          dispatch(authApi.util.resetApiState());
          const me = await refetch();
          router.push(redirect + `my-profile/${me?.data?.userId}`);
          dispatch(setLoggedIn({ isLoggedIn: true }));
          dispatch(setStatus({ status: "success", message: "Successfully logged in via GitHub account." }));
        } catch (error) {
          handleErrors(error, dispatch);
          dispatch(setLoggedIn({ isLoggedIn: false }));
        }
      };

      githubOAuth();
    } else if (params.get("error")) {
      dispatch(setLoggedIn({ isLoggedIn: false }));
      router.push(redirect);
      dispatch(
        setStatus({
          status: "error",
          message:
            "GitHub authentication was not completed or was cancelled. Please try again or choose another sign-in method.",
        })
      );
    }
  }, [accessToken, dispatch, params, redirect, refetch, router]);

  return null;
};

type Props = {
  redirect: string;
};
