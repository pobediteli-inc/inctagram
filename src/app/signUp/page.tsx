"use client";

import s from "app/signUp/signUp.module.css";
import { Button, Card, Typography } from "common/components";
import Link from "next/link";
import { useState } from "react";
import { SignUpForm } from "common/components/forms";
import { RegistrationArgs } from "../../store/services/auth/authApi.types";
import { useRegisterUserMutation } from "../../store/services/auth/authApi";
import { EmailSentPopup } from "./emailSentPopup/emailSentPopup";

export default function SignUp() {
  const [signUp] = useRegisterUserMutation();
  const submitHandler = (data: RegistrationArgs) => {
    signUp(data);
    setEmail(data.email);
    setIsOpen(true);
  };

  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <Card className={s.signUpWrapper}>
      <Typography variant={"h1"} className={s.signUpHeader}>
        Sign Up
      </Typography>

      <SignUpForm onSubmit={submitHandler} />

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
