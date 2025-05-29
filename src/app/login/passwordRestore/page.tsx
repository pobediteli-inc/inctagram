"use client";

import { Button, TextField, Typography } from "common/components";
import s from "./page.module.css";
import Link from "next/link";
import { useState } from "react";
import { Card } from "common/components/card/card";
import { ReCaptcha } from "common/components/recaptcha/recaptcha";
import { BaseModal } from "common/components/modal/baseModal/baseModal";
import { useForm } from "react-hook-form";
import {
  PasswordRecoveryArgs,
  usePasswordRecoveryMutation,
  useResendPasswordRecoveryMutation,
} from "store/services/api/auth";

type Inputs = {
  email: string;
  recaptcha: string;
};

export default function ForgotPassword() {
  const [passwordRecovery, { isLoading }] = usePasswordRecoveryMutation();
  const [resendPasswordRecovery, { isLoading: isResending }] = useResendPasswordRecoveryMutation();
  const [isLinkSent, setIsLinkSent] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [captchaError, setCaptchaError] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
    watch,
    setError,
  } = useForm<Inputs>();

  const email = watch("email");

  const onSubmit = async (data: PasswordRecoveryArgs) => {
    if (!captchaError) {
      try {
        await passwordRecovery({
          email: data.email,
          recaptcha: data.recaptcha,
        }).unwrap();
        setIsLinkSent(true);
        setIsModalOpen(true);
      } catch {
        setError("email", { type: "manual", message: "User with this email doesn't exist" });
      }
    }
  };

  const handleResend = async () => {
    try {
      await resendPasswordRecovery({ email }).unwrap();
    } catch {
      setError("email", { type: "manual", message: "User with this email doesn't exist" });
    }
  };

  const handleCaptcha = (value: string | null) => {
    if (value) {
      setCaptchaError(false);
    }
  };

  return (
    <Card className={s.card}>
      <BaseModal open={isModalOpen} onClose={() => setIsModalOpen(false)} modalTitle="Email sent">
        <div className={s.modalContainer}>
          <Typography variant={"regular_16"} color={"light"}>
            We have sent a link to confirm your email to {email}
          </Typography>
          <Button variant={"primary"} onClick={() => setIsModalOpen(false)} className={s.modalButton}>
            OK
          </Button>
        </div>
      </BaseModal>
      <Typography variant={"h1"} color={"light"} textAlign={"center"}>
        Forgot Password
      </Typography>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <TextField
            textFieldClassName={errors.email ? s.errorEmail : s.email}
            variant={"standard"}
            type={"email"}
            label={"Email"}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Please enter a valid email",
              },
            })}
          />
          {isSubmitted && errors.email && (
            <Typography variant={"regular_14"} color={"error"}>
              {errors.email.message}
            </Typography>
          )}
        </div>

        <Typography variant={"regular_14"} className={s.text} color={"dark"}>
          Enter your email address and we will send you further instructions
        </Typography>

        {isLinkSent ? (
          <>
            <Typography variant={"regular_14"} color={"light"} className={s.otherText}>
              The link has been sent by email.
              <br />
              If you don’t receive an email send link again
            </Typography>
            <div className={s.buttonsWrapper}>
              <Button variant={"primary"} className={s.button} onClick={handleResend} disabled={isResending}>
                Send Link Again
              </Button>
              <Button variant={"link"} className={s.button} asChild disabled={isResending}>
                <Link href={"/login"}>Back to Sign In</Link>
              </Button>
            </div>
          </>
        ) : (
          <div className={s.buttonsWrapper}>
            <Button variant={"primary"} className={s.button} disabled={isLoading}>
              Send Link
            </Button>
            <Button variant={"link"} className={s.button} asChild disabled={isLoading}>
              <Link href={"/login"}>Back to Sign In</Link>
            </Button>
            <ReCaptcha
              siteKey={`${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
              onVerifyAction={handleCaptcha}
              error={isSubmitted && captchaError}
            />
          </div>
        )}
      </form>
    </Card>
  );
}
