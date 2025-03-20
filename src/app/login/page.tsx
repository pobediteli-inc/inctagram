"use client";
import s from "./login.module.css";
import Link from "next/link";
import { Github } from "assets/icons";
import { Button, TextField, Typography } from "common/components";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginArgs, LoginServerError, useLoginMutation } from "store/services/auth";
import { handleClientError } from "common/utils/handleClientError";
import { handleServerError } from "common/utils/handleServerError";
import { useRouter } from "next/navigation";
import GoogleAuth from "../../common/components/googleAuth/googleAuth";

export default function Login() {
  const [login] = useLoginMutation();
  const router = useRouter();

  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
  } = useForm<Props>({
    resolver: zodResolver(LoginScheme),
    mode: "onTouched",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleFormSubmit = async (data: LoginArgs) => {
    try {
      const response = await login(data).unwrap();
      if (response.accessToken) {
        localStorage.setItem("accessToken", response.accessToken);
        router.push("/home");
      }
    } catch (error: unknown) {
      handleClientError(error, setError);
      handleServerError(error as LoginServerError, setError);
    }
  };

  return (
    <div className={s.loginWrapper}>
      <Typography variant={"h1"} className={s.signInHeader}>
        Sign In
      </Typography>
      <div className={s.socialIcons}>
        <GoogleAuth />
        {/*<Link href={"https://www.google.com"} target={"_blank"}>*/}
        {/*  <Google width={36} height={36} />*/}
        {/*</Link>*/}
        <Link href={"https://www.github.com"} target={"_blank"}>
          <Github width={36} height={36} color={"white"} />
        </Link>
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
              <Link href={"/login/password-restore"} className={s.forgotLink}>
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
              <Link href={"/"}>Sign Up</Link>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

const LoginScheme = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address, like example@example.com." }),
  password: z.string().min(1, { message: "Password is required" }),
});

type Props = z.infer<typeof LoginScheme>;
