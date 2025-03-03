"use client";

import s from "app/signUp/signUp.module.css";
import { Button, Card, Typography } from "common/components";
import Link from "next/link";
import { useState } from "react";
import { SignUpForm } from "common/components/forms";
import { Close } from "assets/icons";
import { RegistrationArgs } from "../../store/services/auth/authApi.types";
import { useRegisterUserMutation } from "../../store/services/auth/authApi";

export default function SignUp() {
  const [signUp] = useRegisterUserMutation();
  const submitHandler = (data: RegistrationArgs) => {
    signUp(data);
    setEmail(data.email);
    setIsOpen(true);
  };

  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const closePopup = () => {
    setIsOpen(false);
  };

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
      {isOpen && (
        <div className={s.popUp}>
          <Card className={s.card}>
            <div className={s.popUpHeader}>
              <Typography variant={"h1"} color={"light"}>
                Email sent
              </Typography>
              <button className={s.closeBtn} onClick={closePopup}>
                <Close width={24} height={24} />
              </button>
            </div>
            <div className={s.popUpMessage}>
              <Typography variant={"regular_16"} color={"light"}>
                We have sent a link to confirm your email to {email}
              </Typography>
              <Button onClick={closePopup}>OK</Button>
            </div>
          </Card>
        </div>
      )}
    </Card>
  );
}
