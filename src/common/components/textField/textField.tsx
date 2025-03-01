"use client";
import { ComponentPropsWithRef, forwardRef, memo, useId, useState } from "react";
import { clsx } from "clsx";
import { Slot } from "@radix-ui/react-slot";
import { NullableProps } from "common/types/NullableProps/NullableProps";
import s from "./textField.module.css";
import { EyeOffOutline, EyeOutline } from "assets/icons";
import { Typography } from "common/components/typography/typography";

export const TextField = memo(
  forwardRef<HTMLInputElement, TextFieldProps>(
    (
      {
        className,
        textFieldClassName,
        labelClassName,
        errorClassName,
        variant = "standard",
        asChild = false,
        type = "text",
        label,
        disabled = false,
        error = null,
        ...rest
      },
      ref
    ) => {
      const [passwordVisible, setPasswordVisible] = useState(false);
      const generatedId = useId();

      const id = rest.id || generatedId;
      const Component = asChild ? Slot : "input";
      const isError = !!error;

      const handlePasswordVisible = () => setPasswordVisible(!passwordVisible);

      return (
        <div className={clsx(s.textFieldWrapper, className)}>
          {label && (
            <Typography variant={"regular_14"} color={"dark"} asChild>
              <label htmlFor={id} className={clsx(s.label, { [s.labelDisabled]: disabled }, labelClassName)}>
                {label}
              </label>
            </Typography>
          )}
          <Component
            id={id}
            className={clsx(s.textFieldBaseStyles, s[variant], { [s.errorTextField]: isError }, textFieldClassName)}
            disabled={disabled}
            type={type === "password" && passwordVisible ? "text" : type}
            ref={ref}
            {...rest}
          />

          {type === "password" &&
            (passwordVisible ? (
              <EyeOutline
                className={s.passwordVisible}
                width={24}
                height={24}
                onClick={handlePasswordVisible}
                color={"white"}
              />
            ) : (
              <EyeOffOutline
                className={s.passwordVisible}
                width={24}
                height={24}
                onClick={handlePasswordVisible}
                color={"white"}
              />
            ))}

          {isError && (
            <Typography variant={"regular_14"} asChild>
              <span className={clsx(s.errorMessage, errorClassName)}>{error}</span>
            </Typography>
          )}
        </div>
      );
    }
  )
);

TextField.displayName = "TextField";

export type TextFieldProps = {
  textFieldClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  variant?: "standard" | "filled" | "outlined";
  type?: "text" | "password" | "email" | "number" | "search" | "date";
  asChild?: boolean;
  label?: string;
  error?: NullableProps<string>;
} & ComponentPropsWithRef<"input">;
