"use client";

import s from "app/signUp/signUp.module.css";
import { Button, ControlledCheckbox, ControlledTextField, Typography, Cards } from "common/components";
import Link from "next/link";
import { useState } from "react";
import { z } from "zod";
import validator from "validator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const signInSchema = z
  .object({
    username: z
      .string({
        required_error: "Username is required.",
      })
      .min(6)
      .max(30)
      .regex(/^[a-z\d\-_]+$/i, {
        message: "Usernames may only include letters, numbers, underscores (_), and hyphens (-).",
      }),
    email: z
      .string({
        required_error: "Email is required.",
      })
      .email("Please enter a valid email address, like example@example.com."),
    password: z
      .string({
        required_error: "Password is required.",
      })
      .min(6)
      .max(20)
      .refine(
        (password) =>
          validator.isStrongPassword(password, {
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
            returnScore: false,
          }),
        {
          message:
            "Your password must include at least one letter (A-Z, a-z), one number (0-9), and one special character (!, @, #, $, etc.).",
        }
      ),
    confirmPassword: z.string(),
    termsAgreement: z
      .boolean()
      .default(false)
      .refine((isAgreed) => isAgreed, {
        message: "Please read and accept the Terms of Service and Privacy Policy to continue.",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof signInSchema>;

export default function SignUp() {
  const { control, handleSubmit, formState } = useForm<FormValues>({
    resolver: zodResolver(signInSchema),
    mode: "onTouched",
  });
  const submitHandler = handleSubmit((data) => {
    alert(JSON.stringify(data, null, 2));
    setEmail(data.email);
    setIsOpen(true);
  });

  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const closePopup = () => {
    setIsOpen(false);
  };

  return (
    <div className={s.signUpWrapper}>
      <Typography variant={"h1"} className={s.signUpHeader}>
        Sign Up
      </Typography>

      <div className={s.mainContent}>
        <form onSubmit={submitHandler}>
          <div className={s.forms}>
            <ControlledTextField
              textFieldClassName={s.username}
              type={"text"}
              placeholder={"User123"}
              label={"Username"}
              control={control}
              name={"username"}
            />
            <ControlledTextField
              textFieldClassName={s.email}
              type={"email"}
              placeholder={"example@example.com"}
              label={"Email"}
              control={control}
              name={"email"}
            />
            <ControlledTextField
              textFieldClassName={s.password}
              type={"password"}
              placeholder={"**********"}
              label={"Password"}
              control={control}
              name={"password"}
            />
            <ControlledTextField
              textFieldClassName={s.password}
              type={"password"}
              placeholder={"**********"}
              label={"Confirm password"}
              control={control}
              name={"confirmPassword"}
            />
          </div>

          <div className={s.terms}>
            <ControlledCheckbox control={control} name={"termsAgreement"} />

            <Typography variant={"small"}>
              I agree to the&nbsp;
              <Link className={s.link} href={"/signUp/terms/service"}>
                Terms of Service
              </Link>
              &nbsp; and&nbsp;
              <Link className={s.link} href={"/signUp/terms/policy"}>
                Privacy Policy
              </Link>
            </Typography>
          </div>

          <div className={s.buttonWrapper}>
            <Button type="submit" disabled={!formState.isDirty || !formState.isValid}>
              Sign Up
            </Button>
            <Typography className={s.isAccount} variant={"regular_16"} textAlign={"center"}>
              Do you have an account?
            </Typography>
            <Button asChild variant={"link"}>
              <Link href={"../login"}>Sign In</Link>
            </Button>
            {isOpen && (
              <div className={s.popupStyles}>
                <Cards>
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
                </Cards>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
