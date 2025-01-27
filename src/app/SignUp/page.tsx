"use client";
import stl from "app/SignUp/SignUp.module.css";
import { Typography } from "common/components/Typography/Typography";
import GoogleSvgRepoCom1 from "common/components/SVGComponents/GoogleSvgRepoCom1";
import GithubSvgRepoCom31 from "common/components/SVGComponents/GithubSvgRepoCom31";
import { TextField } from "common/components/TextField/TextField";
import { RadixCheckbox } from "common/components/RadixCheckbox/RadixCheckbox";
import { useState } from "react";
import Link from "next/link";
import { Button } from "common/components/Button/Button";

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
        <RadixCheckbox checked={checked} setChecked={setChecked} />
        <Typography variant={"small"}>
          I agree to the{" "}
          <Link className={stl.link} href={"/SignUp/Terms/Service"}>
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link className={stl.link} href={"/SignUp/Terms/Policy"}>
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
          <Link href={"../Login"}>Sign In</Link>
        </Button>
      </div>
    </div>
  );
}
