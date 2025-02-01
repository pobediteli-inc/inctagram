"use client";
import stl from "app/signUp/signUp.module.css";
import { Typography } from "common/components/typography/typography";
import GoogleSvgRepoCom1 from "assets/icons/GoogleSvgRepoCom1";
import GithubSvgRepoCom31 from "assets/icons/GithubSvgRepoCom31";
import { TextField } from "common/components/textField/textField";
import { Checkbox } from "common/components/checkbox/checkbox";
import { useState } from "react";
import Link from "next/link";
import { Button } from "common/components/button/button";

export default function SignUpPage() {
  const [checked, setChecked] = useState(false);

  return (
    <div className={stl.signUpWrapper}>
      <Typography variant={"h1"} className={stl.signUpHeader}>
        Sign Up
      </Typography>
      <div className={stl.socialIcons}>
        <Link href={"https://www.google.com"} target={"_blank"}>
          <GoogleSvgRepoCom1 width={36} height={36} />
        </Link>
        <Link href={"https://www.github.com"} target={"_blank"}>
          <GithubSvgRepoCom31 width={36} height={36} color={"white"} />
        </Link>
      </div>
      <div className={stl.forms}>
        <TextField
          textFieldClassName={stl.username}
          variant={"standard"}
          type={"text"}
          placeholder={"username"}
          label={"Username"}
          labelPosition={"top"}
        />
        <TextField
          textFieldClassName={stl.email}
          variant={"standard"}
          type={"email"}
          placeholder={"example@example.com"}
          label={"Email"}
          labelPosition={"top"}
        />
        <TextField
          textFieldClassName={stl.password}
          variant={"standard"}
          type={"password"}
          placeholder={"**********"}
          label={"Password"}
          labelPosition={"top"}
        />
        <TextField
          textFieldClassName={stl.password}
          variant={"standard"}
          type={"password"}
          placeholder={"**********"}
          label={"Confirm password"}
          labelPosition={"top"}
        />
      </div>
      <div className={stl.terms}>
        <Checkbox checked={checked} setChecked={setChecked} />
        <Typography variant={"small"}>
          I agree to the{" "}
          <Link className={stl.link} href={"/signUp/terms/service"}>
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link className={stl.link} href={"/signUp/terms/policy"}>
            Privacy Policy
          </Link>
        </Typography>
      </div>
      <div className={stl.buttonWrapper}>
        <Button variant={"primary"} className={stl.signUpButton}>
          Sign Up
        </Button>
      </div>
      <div className={stl.buttonWrapper}>
        <Typography variant={"regular_16"}>Do you have an account?</Typography>
        <Button asChild variant={"outlined"} className={stl.signInButton}>
          <Link href={"../login"}>Sign In</Link>
        </Button>
      </div>
    </div>
  );
}
