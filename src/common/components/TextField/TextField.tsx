import React, { forwardRef } from "react";
import { clsx } from "clsx";
import type { ComponentPropsWithRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { NullableProps } from "common/types/NullableProps/NullableProps";
import stl from "common/components/TextField/TextField.module.css";

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      containerClassName,
      textFieldClassName,
      labelClassName,
      errorMessageClassName,
      variant = "standard",
      asChild = false,
      label,
      disabled = false,
      labelPosition = "top",
      errorPosition = "bottom",
      errorMessage,
      ...rest
    },
    ref
  ) => {
    const Component = asChild ? Slot : "input";
    const isError = !!errorMessage;

    return (
      <div
        className={clsx(stl.textFieldWrapper, stl[`label-${labelPosition}`], stl[`error-${errorPosition}`], containerClassName)}>
        { label && (<label htmlFor={rest.name} className={clsx(stl.label, { [stl.labelDisabled]: disabled }, labelClassName)} aria-disabled={disabled}>{label}</label>) }

        <Component
          ref={ref}
          className={clsx(
            stl.input, variant &&
            stl[variant],
            { [stl.errorInput]: isError,
              [stl.errorDisabled]: disabled
            },
            textFieldClassName,
            )}
          disabled={disabled}
          {...rest}
        />

        { isError && (<span className={clsx(stl.errorMessage, errorMessageClassName)}>{errorMessage}</span>) }
      </div>
    );
  }
);

TextField.displayName = "TextField";

type TextFieldProps = {
  containerClassName?: string;
  textFieldClassName?: string;
  labelClassName?: string;
  errorMessageClassName?: string;
  variant?: "outlined" | "filled" | "standard";
  asChild?: boolean;
  label?: string;
  disabled?: boolean;
  errorMessage?: NullableProps<string>;
  labelPosition?: "top" | "bottom" | "left" | "right";
  errorPosition?: "top" | "bottom" | "left" | "right";
} & ComponentPropsWithRef<"input">;
