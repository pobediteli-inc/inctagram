"use client";

import s from "app/auth/auth.module.css";
import { Button, Card, Typography } from "common/components";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SignUpForm } from "common/components/forms";
import {
  RegistrationArgs,
  RegistrationServerError,
  useLoginGoogleMutation, useMeQuery,
  useRegisterUserMutation,
} from "store/services/auth";
import { EmailSentPopup } from "./emailSentPopup/emailSentPopup";
import { NullableProps } from "common/types";
import { useRouter, useSearchParams } from "next/navigation";
import { setLoggedIn } from "../../features/slices/auth/authSlice";
import { useAppDispatch } from "../../common/hooks/useAppDispatch";
import { handleErrors } from "../../common/utils/handleErrors";

export type SignUpApiError = {
  message: string;
  field: string;
};

export default function Auth() {
  const [signUp] = useRegisterUserMutation();
  const [apiError, setApiError] = useState<NullableProps<SignUpApiError>>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const searchParams = useSearchParams();
  const [loginGoogle] = useLoginGoogleMutation();
  const router = useRouter();
  const { refetch } = useMeQuery();
  const dispatch = useAppDispatch();


  const submitHandler = async (data: RegistrationArgs, resetForm: () => void) => {
    try {
      await signUp(data).unwrap();
      setEmail(data.email);
      setIsOpen(true);
      setApiError(null);
      resetForm();
    } catch (err) {
      const error = err as RegistrationServerError;
      if (error.data.messages && error.data.messages.length > 0) {
        setApiError({ field: error.data.messages[0].field, message: error.data.messages[0].message });
      }
    }
  };

  const code = searchParams.get("code");
  console.log("code", code);

  useEffect(() => {
    if (code) {
      handleGoogleLogin(code);
    }
  }, [code]);

  const handleGoogleLogin = async (code: string) => {
    try {
      const response = await loginGoogle({ code }).unwrap();
      if (response.accessToken) {
        localStorage.setItem("accessToken", response.accessToken);
        dispatch(setLoggedIn({ isLoggedIn: true }));
        await refetch();
        router.push("/home");
      }
    } catch (error) {
      handleErrors(error, dispatch);
      dispatch(setLoggedIn({ isLoggedIn: false }));
      console.error("Ошибка входа через Google", error);
    }
  };

  return (
    <Card className={s.authWrapper}>
      <Typography variant={"h1"} className={s.authHeader}>
        Sign Up
      </Typography>

      <SignUpForm onSubmit={submitHandler} apiError={apiError} />

      <Typography className={s.isAccount} variant={"regular_16"}>
        Do you have an account?
      </Typography>
      <Button asChild variant={"link"}>
        <Link href={"../login"}>Sign In</Link>
      </Button>
      {isOpen && <EmailSentPopup close={() => setIsOpen(false)} email={email} />}
    </Card>
  );
}
