"use client";
import { ChangeEvent, ComponentPropsWithRef, forwardRef, memo, useId, useState } from "react";
import { clsx } from "clsx";
import { NullableProps } from "common/types/NullableProps/NullableProps";
import s from "./textField.module.css";
import { EyeOffOutline, EyeOutline } from "assets/icons";
import { Typography } from "common/components/typography/typography";
import { Slot } from "@radix-ui/react-slot";

export const TextField = memo(
  forwardRef<HTMLInputElement, TextFieldProps>(
    (
      {
        className,
        textFieldClassName,
        labelClassName,
        errorClassName,
        variant = "standard",
        type = "text",
        label,
        disabled = false,
        error = null,
        inputChangeHandler,
        value,
        asChild,
        ...rest
      },
      ref
    ) => {
      const [passwordVisible, setPasswordVisible] = useState(false);
      const generatedId = useId();
      const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        inputChangeHandler?.(e.target.value);
      };

      const id = rest.id || generatedId;
      const isError = !!error;

      const Component = asChild ? Slot : "input";

      const handlePasswordVisible = () => setPasswordVisible(!passwordVisible);

      return (
        <div className={clsx(s.textFieldWrapper, className)}>
          {label && (
            <Typography variant={"regular_14"} color={"dark"} asChild>
              <label htmlFor={id} className={clsx(s.label, { [s.labelDisabled]: disabled }, labelClassName)}>
                {label}
                {rest.required && <span className={s.required}>*</span>}
              </label>
            </Typography>
          )}
          <Component
            id={id}
            className={clsx(s.textFieldBaseStyles, s[variant], { [s.errorTextField]: isError }, textFieldClassName)}
            disabled={disabled}
            type={type === "password" && passwordVisible ? "text" : type}
            onChange={changeHandler}
            ref={ref}
            value={value}
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
  inputChangeHandler?: (value: string) => void;
} & ComponentPropsWithRef<"input">;
