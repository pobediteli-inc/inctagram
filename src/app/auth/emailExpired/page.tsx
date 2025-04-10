"use client";

import { Button, ControlledTextField, Typography, ProgressBar } from "common/components";
import rafiki from "assets/img/rafiki.svg";
import { useForm } from "react-hook-form";
import Image from "next/image";
import s from "./emailExpired.module.css";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { EmailSentPopup } from "../emailSentPopup/emailSentPopup";
import { redirect } from "next/navigation";
import { useResendRegistrationEmailMutation } from "store/services/api/auth/authApi";

const resendLinkSchema = z.object({
  email: z
    .string({
      required_error: "Email is required.",
    })
    .email("Please enter a valid email address, like example@example.com."),
});

type ResendLinkFormValues = z.infer<typeof resendLinkSchema>;

export default function EmailExpired() {
  const { control, handleSubmit } = useForm<ResendLinkFormValues>({
    resolver: zodResolver(resendLinkSchema),
    mode: "onTouched",
  });

  const [resendRegistrationEmail, { isLoading, isSuccess }] = useResendRegistrationEmailMutation();

  const [popUpIsOpen, setPopUpIsOpen] = useState(false);
  const [email, setEmail] = useState("");

  const submitHandler = handleSubmit(async (data: ResendLinkFormValues) => {
    await resendRegistrationEmail({ email: data.email });
    setEmail(data.email);
  });

  useEffect(() => {
    if (isSuccess) {
      setPopUpIsOpen(true);
    }
  }, [isSuccess, email]);

  return (
    <>
      {isLoading && !isSuccess && <ProgressBar />}
      <div className={s.contentWrapper}>
        <Typography variant={"h1"}>Email verification link expired</Typography>
        <Typography variant={"regular_16"}>
          Looks like the verification link has expired. Not to worry, we can send the link again
        </Typography>
      </div>

      <form onSubmit={submitHandler} className={s.form}>
        <ControlledTextField
          name={"email"}
          control={control}
          label={"Email"}
          type={"email"}
          placeholder={"Epam@epam.com"}
        />
        <Button type={"submit"} className={s.button}>
          Resend verification link
        </Button>
      </form>

      <Image src={rafiki} alt={""} />

      {popUpIsOpen && <EmailSentPopup close={() => redirect("/auth")} email={email} />}
    </>
  );
}
