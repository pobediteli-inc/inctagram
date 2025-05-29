"use client";
import s from "./login.module.css";
import Link from "next/link";
import { Github, Google } from "assets/icons";
import { Button, TextField, Typography } from "common/components";
import { Controller } from "react-hook-form";
import { useLogin } from "./hooks/useLogin";
import { ROUTES } from "common/constants/routes";

export default function Login() {
  const { handleSubmit, control, errors, handleFormSubmit } = useLogin();

  const handleAuthViaGoogle = () =>
    window.location.assign(
      `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}&response_type=code&scope=email+profile`
    );
  const handleAuthViaGithub = () => window.location.assign(`${process.env.NEXT_PUBLIC_API_BASE_URL}auth/github/login`);

  return (
    <div className={s.loginWrapper}>
      <Typography variant={"h1"} className={s.signInHeader}>
        Sign In
      </Typography>
      <div className={s.socialIcons}>
        <Google width={36} height={36} color={"white"} onClick={handleAuthViaGoogle} style={{ cursor: "pointer" }} />
        <Github width={36} height={36} color={"white"} onClick={handleAuthViaGithub} style={{ cursor: "pointer" }} />
      </div>
      <div className={s.mainContent}>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className={s.fieldsWrapper}>
            <Controller
              name={"email"}
              control={control}
              render={({ field }) => (
                <TextField
                  variant={"standard"}
                  type={"email"}
                  placeholder={"example@example.com"}
                  label={"Email"}
                  error={errors.email?.message}
                  autoComplete={"email"}
                  {...field}
                />
              )}
            />
            <Controller
              name={"password"}
              control={control}
              render={({ field }) => (
                <TextField
                  variant={"standard"}
                  type={"password"}
                  placeholder={"**********"}
                  label={"Password"}
                  error={errors.password?.message}
                  autoComplete={"current-password"}
                  {...field}
                />
              )}
            />
          </div>
          <div className={s.buttonsWrapper}>
            <Typography variant={"regular_14"} textAlign={"right"} style={{ marginBottom: 25 }}>
              <Link href={ROUTES.passwordRestore} className={s.forgotLink}>
                Forgot password?
              </Link>
            </Typography>
            <Button variant={"primary"} type={"submit"}>
              Sign In
            </Button>
            <Typography variant={"regular_16"} textAlign={"center"} style={{ marginBottom: 5, marginTop: 15 }}>
              Don&#39;t have an account?
            </Typography>
            <Button variant={"link"} asChild>
              <Link href={ROUTES.auth}>Sign Up</Link>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
