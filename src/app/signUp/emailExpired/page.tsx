"use client";

import { Button, ControlledTextField, Typography } from "common/components";
import rafiki from "assets/img/rafiki.svg";
import { useForm } from "react-hook-form";
import Image from "next/image";
import s from "./emailExpired.module.css";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { EmailSentPopup } from "../emailSentPopup/emailSentPopup";
import { redirect } from "next/navigation";

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

  const [popUpIsOpen, setPopUpIsOpen] = useState(false);
  const [email, setEmail] = useState("");

  const submitHandler = handleSubmit((data: ResendLinkFormValues) => {
    alert(JSON.stringify(data));
    setEmail(data.email);
    setPopUpIsOpen(true);
  });

  return (
    <>
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

      {popUpIsOpen && <EmailSentPopup close={() => redirect("/signUp")} email={email} />}
    </>
  );
}
