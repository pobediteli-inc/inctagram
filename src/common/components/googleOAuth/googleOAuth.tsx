"use client";

import { FC, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthViaGoogleMutation, useMeQuery } from "store/services/api/auth";
import { setLoggedIn, setStatus } from "store/services/slices";
import { useAppDispatch } from "common/hooks";
import { handleErrors } from "common/utils";

export const GoogleOAuth: FC<Props> = ({ redirect }) => {
  const [authViaGoogle] = useAuthViaGoogleMutation();
  const { refetch } = useMeQuery();
  const params = useSearchParams();
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    const code = params.get("code");
    if (code) {
      const googleOAuth = async () => {
        try {
          const response = await authViaGoogle({ code }).unwrap();
          if (response.accessToken) {
            localStorage.setItem("accessToken", response.accessToken);
            dispatch(setLoggedIn({ isLoggedIn: true }));
            dispatch(setStatus({ status: "success", message: "Successfully logged in via google account." }));
            await refetch();
            router.push(redirect);
          }
        } catch (error) {
          handleErrors(error, dispatch);
          dispatch(setLoggedIn({ isLoggedIn: false }));
        }
      };

      googleOAuth();
    }
  }, [authViaGoogle, dispatch, params, redirect, refetch, router]);

  return null;
};

type Props = {
  redirect: string;
};
