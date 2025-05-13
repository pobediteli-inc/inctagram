"use client";

import { FC, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authApi, useAuthViaGoogleMutation, useMeQuery } from "store/services/api/auth";
import { setLoggedIn, setStatus } from "store/services/slices";
import { useAppDispatch } from "common/hooks";
import { handleErrors } from "common/utils";

export const GoogleOAuth: FC<Props> = ({ redirect }) => {
  const [authViaGoogle] = useAuthViaGoogleMutation();
  const { refetch } = useMeQuery();
  const params = useSearchParams();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const code = params.get("code");

  useEffect(() => {
    if (code) {
      const googleOAuth = async () => {
        try {
          const response = await authViaGoogle({ code }).unwrap();
          if (response.accessToken) {
            localStorage.setItem("accessToken", response.accessToken);
            dispatch(authApi.util.resetApiState());
            const me = await refetch();
            router.push(redirect + `my-profile/${me?.data?.userId}`);
            dispatch(setLoggedIn({ isLoggedIn: true }));
            dispatch(setStatus({ status: "success", message: "Successfully logged in via Google account." }));
          }
        } catch (error) {
          handleErrors(error, dispatch);
          dispatch(setLoggedIn({ isLoggedIn: false }));
        }
      };

      googleOAuth();
    } else if (params.get("error")) {
      dispatch(setLoggedIn({ isLoggedIn: false }));
      router.push(redirect);
      dispatch(
        setStatus({
          status: "error",
          message:
            "Google authentication was not completed or was cancelled. Please try again or choose another sign-in method.",
        })
      );
    }
  }, [authViaGoogle, code, dispatch, params, redirect, refetch, router]);

  return null;
};

type Props = {
  redirect: string;
};
