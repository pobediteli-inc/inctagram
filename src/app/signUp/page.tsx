"use client";
import s from "app/signUp/signUp.module.css";
import { Typography, TextField, Checkbox, Button } from "common/components";
import { Google, Github } from "assets/icons";
import { useState } from "react";
import Link from "next/link";

export default function SignUp() {
  const [checked, setChecked] = useState<"indeterminate" | boolean>(false);

  return (
    <div className={s.signUpWrapper}>
      <Typography variant={"h1"} className={s.signUpHeader}>
        Sign Up
      </Typography>
      <div className={s.socialIcons}>
        <Link href={"https://www.google.com"} target={"_blank"}>
          <Google width={36} height={36} />
        </Link>
        <Link href={"https://www.github.com"} target={"_blank"}>
          <Github width={36} height={36} color={"white"} />
        </Link>
      </div>
      <div className={s.mainContent}>
        <div className={s.forms}>
          <TextField
            textFieldClassName={s.username}
            variant={"standard"}
            type={"text"}
            placeholder={"username"}
            label={"Username"}
          />
          <TextField
            textFieldClassName={s.email}
            variant={"standard"}
            type={"email"}
            placeholder={"example@example.com"}
            label={"Email"}
          />
          <TextField
            textFieldClassName={s.password}
            variant={"standard"}
            type={"password"}
            placeholder={"**********"}
            label={"Password"}
          />
          <TextField
            textFieldClassName={s.password}
            variant={"standard"}
            type={"password"}
            placeholder={"**********"}
            label={"Confirm password"}
          />
        </div>
        <div className={s.terms}>
          <Checkbox checked={checked} onCheckedChange={setChecked} />
          <Typography variant={"small"}>
            I agree to the{" "}
            <Link className={s.link} href={"/signUp/terms/service"}>
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link className={s.link} href={"/signUp/terms/policy"}>
              Privacy Policy
            </Link>
          </Typography>
        </div>
        <div className={s.buttonWrapper}>
          <Button variant={"primary"}>Sign Up</Button>
          <Typography className={s.isAccount} variant={"regular_16"} textAlign={"center"}>
            Do you have an account?
          </Typography>
          <Button asChild variant={"link"}>
            <Link href={"../login"}>Sign In</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
