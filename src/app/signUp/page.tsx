"use client";

import s from "app/signUp/signUp.module.css";
import { Button, Card, Typography } from "common/components";
import Link from "next/link";
import { useState } from "react";
import { SignUpForm, SignUpFormValues } from "common/components/forms";

export default function SignUp() {
  const submitHandler = (data: SignUpFormValues) => {
    alert(JSON.stringify(data, null, 2));
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
      <div className={s.mainContent}>
        <SignUpForm onSubmit={submitHandler} />

        <Typography className={s.isAccount} variant={"regular_16"} textAlign={"center"}>
          Do you have an account?
        </Typography>
        <Button asChild variant={"link"}>
          <Link href={"../login"}>Sign In</Link>
        </Button>
        {isOpen && (
          <div className={s.popupStyles}>
            <Card>
              <div className={s.popUpHeader}>
                <Typography variant={"h1"} color={"light"}>
                  Email sent
                </Typography>
                <span className={s.closeBtn} onClick={closePopup}>
                  &times;
                </span>
              </div>
              <div className={s.messageAndButton}>
                <Typography variant={"regular_16"} color={"light"}>
                  We have sent a link to confirm your email to {email}
                </Typography>
                <Button onClick={closePopup}>OK</Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </Card>
  );
}
