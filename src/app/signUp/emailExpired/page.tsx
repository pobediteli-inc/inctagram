"use client";

import { Button, ControlledTextField, Typography } from "common/components";
import rafiki from "assets/img/rafiki.svg";
import { useForm } from "react-hook-form";
import Image from "next/image";

import s from "./emailExpired.module.css";

export default function EmailExpired() {
  const { control } = useForm();
  return (
    <>
      <div className={s.contentWrapper}>
        <Typography variant={"h1"}>Email verification link expired</Typography>
        <Typography variant={"regular_16"}>
          Looks like the verification link has expired. Not to worry, we can send the link again
        </Typography>
      </div>

      <form className={s.form}>
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
    </>
  );
}
