"use client";
import s from "./login.module.css";
import Link from "next/link";
import { Github, Google } from "assets/icons";
import { Button, TextField, Typography } from "common/components";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginRequest, useLoginMutation, useMeQuery } from "store/services/auth";
import { useRouter } from "next/navigation";
import { handleAuthFieldError } from "common/utils/handleAuthFieldError";
import { setLoggedIn } from "features/auth/authSlice";
import { useAppDispatch } from "common/hooks/useAppDispatch";

export default function Login() {
  const [login] = useLoginMutation();
  const { refetch } = useMeQuery();
  const router = useRouter();
  const dispatch = useAppDispatch();

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

  const handleFormSubmit = async (data: LoginRequest) => {
    try {
      const response = await login(data).unwrap();
      if (response.accessToken) {
        localStorage.setItem("accessToken", response.accessToken);
        dispatch(setLoggedIn({ isLoggedIn: true }));
        await refetch();
        router.push("/home");
      }
    } catch (error: unknown) {
      dispatch(setLoggedIn({ isLoggedIn: false }));
      handleAuthFieldError(error, setError);
    }
  };

  return (
    <div className={s.loginWrapper}>
      <Typography variant={"h1"} className={s.signInHeader}>
        Sign In
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
