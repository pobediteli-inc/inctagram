import s from "./signUpForm.module.css";
import Link from "next/link";
import { Button, Typography, ControlledTextField, ControlledCheckbox } from "common/components";
import { z } from "zod";
import validator from "validator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const signUpSchema = z
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

export type SignUpFormValues = z.infer<typeof signUpSchema>;

type Props = {
  onSubmit: (data: SignUpFormValues) => void;
};

export const SignUpForm = ({ onSubmit }: Props) => {
  const { control, handleSubmit, formState, reset } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    mode: "onTouched",
  });

  const submitHandler = handleSubmit((data) => {
    onSubmit(data);
    reset();
  });

  return (
    <form onSubmit={submitHandler}>
      <div className={s.forms}>
        <ControlledTextField
          type={"text"}
          placeholder={"User123"}
          label={"Username"}
          control={control}
          name={"username"}
        />
        <ControlledTextField
          type={"email"}
          placeholder={"example@example.com"}
          label={"Email"}
          control={control}
          name={"email"}
        />
        <ControlledTextField
          type={"password"}
          placeholder={"**********"}
          label={"Password"}
          control={control}
          name={"password"}
        />
        <ControlledTextField
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
      </div>
    </form>
  );
};
