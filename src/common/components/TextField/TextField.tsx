"use client";
import type { ComponentPropsWithRef } from "react";
import { forwardRef, memo, useState } from "react";
import { clsx } from "clsx";
import { Slot } from "@radix-ui/react-slot";
import { NullableProps } from "common/types/NullableProps/NullableProps";
import stl from "common/components/TextField/TextField.module.css";
import EyeOffOutline from "common/components/SVGComponents/EyeOffOutline";
import EyeOutline from "common/components/SVGComponents/EyeOutline";

export const TextField = memo(
  forwardRef<HTMLInputElement, TextFieldProps>(
    (
      {
        containerClassName,
        textFieldClassName,
        labelClassName,
        errorMessageClassName,
        variant = "standard",
        asChild = false,
        type = "text",
        label,
        disabled = false,
        labelPosition = "top",
        errorPosition = "bottom",
        errorMessage,
        ...rest
      },
      ref
    ) => {
      const [passwordVisible, setPasswordVisible] = useState(false);
      const Component = asChild ? Slot : "input";
      const isError = !!errorMessage;

      const handlePasswordVisible = () => setPasswordVisible(!passwordVisible);
      return (
        <div
          className={clsx(
            stl.textFieldWrapper,
            stl[`label-${labelPosition}`],
            stl[`error-${errorPosition}`],
            containerClassName
          )}
        >
          {label && (
            <label
              htmlFor={rest.name}
              className={clsx(stl.label, { [stl.labelDisabled]: disabled }, labelClassName)}
              aria-disabled={disabled}
            >
              {label}
            </label>
          )}
          <Component
            className={clsx(
              variant && stl[variant],
              { [stl.errorInput]: isError, [stl.errorDisabled]: disabled },
              textFieldClassName
            )}
            disabled={disabled}
            type={type === "password" && passwordVisible ? "text" : type}
            ref={ref}
            {...rest}
          />

          {type === "password" &&
            (passwordVisible ? (
              <EyeOutline className={stl.passwordVisible} width={24} height={24} onClick={handlePasswordVisible} />
            ) : (
              <EyeOffOutline className={stl.passwordVisible} width={24} height={24} onClick={handlePasswordVisible} />
            ))}

          {isError && <span className={clsx(stl.errorMessage, errorMessageClassName)}>{errorMessage}</span>}
        </div>
      );
    }
  )
);

TextField.displayName = "TextField";

type TextFieldProps = {
  containerClassName?: string;
  textFieldClassName?: string;
  labelClassName?: string;
  errorMessageClassName?: string;
  variant?: "standard" | "filled" | "outlined";
  type?: "text" | "password" | "email" | "number" | "search";
  asChild?: boolean;
  label?: string;
  disabled?: boolean;
  errorMessage?: NullableProps<string>;
  labelPosition?: "top" | "bottom" | "left" | "right";
  errorPosition?: "top" | "bottom" | "left" | "right";
} & ComponentPropsWithRef<"input">;
