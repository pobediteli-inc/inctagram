"use client";

import { Button, TextField, Typography } from "common/components";
import s from "./page.module.css";
import { Card } from "common/components/card/card";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { useCheckRecoveryCodeMutation, useNewPasswordMutation } from "store/services/api/auth";
import { useEffect } from "react";

type Inputs = {
  password: string;
  confirmPassword: string;
};

export default function NewPassword() {
  const [newPassword, { isLoading }] = useNewPasswordMutation();
  const [checkRecoveryCode] = useCheckRecoveryCodeMutation();
  const searchParams = useSearchParams();
  const recoveryCode = searchParams.get("code");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitted },
  } = useForm<Inputs>();

  const onSubmit = async (data: Inputs) => {
    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", { type: "manual", message: "The passwords must match" });
    } else if (recoveryCode) {
      try {
        await newPassword({
          newPassword: data.confirmPassword,
          recoveryCode,
        }).unwrap();
        router.push("/login");
      } catch {
        /* empty */
      }
    }
  };

  useEffect(() => {
    const isRecoveryCodeValid = async () => {
      if (recoveryCode) {
        try {
          await checkRecoveryCode({ recoveryCode }).unwrap();
        } catch {
          router.push("/login/verification-link-expired");
        }
      } else {
        router.push("/login/verification-link-expired");
      }
    };
    isRecoveryCodeValid();
  }, [recoveryCode, checkRecoveryCode, router]);

  return (
    <Card className={s.card}>
      <Typography variant={"h1"} color={"light"} textAlign={"center"}>
        Create New Password
      </Typography>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={s.inputWrapper}>
          <TextField
            textFieldClassName={errors.password ? s.errorPassword : s.password}
            variant={"standard"}
            type={"password"}
            label={"New password"}
            {...register("password", { required: true, minLength: 6, maxLength: 20 })}
          />
          <div>
            <TextField
              textFieldClassName={errors.confirmPassword ? s.errorPassword : s.password}
              variant={"standard"}
              type={"password"}
              label={"Password confirmation"}
              {...register("confirmPassword", { required: true })}
            />
            {isSubmitted && errors.confirmPassword && (
              <Typography variant={"regular_14"} color={"error"}>
                {errors.confirmPassword.message}
              </Typography>
            )}
          </div>
        </div>
        <Typography variant={"regular_14"} color={"dark"} className={s.text}>
          Your password must be between 6 and 20 characters
        </Typography>
        <div className={s.buttonsWrapper}>
          <Button variant={"primary"} className={s.button} disabled={isLoading}>
            Create new password
          </Button>
        </div>
      </form>
    </Card>
  );
}
