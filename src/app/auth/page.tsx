"use client";

import s from "app/auth/auth.module.css";
import { Button, Card, Typography } from "common/components";
import Link from "next/link";
import { useState } from "react";
import { SignUpForm } from "common/components/forms";
import { RegistrationArgs, RegistrationServerError, useRegisterUserMutation } from "store/services/api/auth";
import { EmailSentPopup } from "./emailSentPopup/emailSentPopup";
import { NullableProps } from "common/types";
import { Github, Google } from "assets/icons";

export type SignUpApiError = {
  message: string;
  field: string;
};

export default function Auth() {
  const [signUp] = useRegisterUserMutation();
  const [apiError, setApiError] = useState<NullableProps<SignUpApiError>>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");

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

  const handleAuthViaGoogle = () =>
    window.location.assign(
      `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}&response_type=code&scope=email+profile`
    );
  const handleAuthViaGithub = () => window.location.assign(`${process.env.NEXT_PUBLIC_API_BASE_URL}auth/github/login`);

  return (
    <Card className={s.authWrapper}>
      <Typography variant={"h1"} className={s.authHeader}>
        Sign Up
      </Typography>

      <div className={s.socialIcons}>
        <Google width={36} height={36} color={"white"} onClick={handleAuthViaGoogle} style={{ cursor: "pointer" }} />
        <Github width={36} height={36} color={"white"} onClick={handleAuthViaGithub} style={{ cursor: "pointer" }} />
      </div>

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
