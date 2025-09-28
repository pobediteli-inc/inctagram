"use client";

import { FieldValues, UseControllerProps, useController } from "react-hook-form";
import { TextField, TextFieldProps } from "../textField/textField";

type Props<T extends FieldValues> = Omit<TextFieldProps, "inputChangeHandler" | "name" | "onBlur" | "ref" | "value"> &
  UseControllerProps<T>;

export const ControlledTextField = <T extends FieldValues>({
  control,
  defaultValue,
  disabled,
  label,
  name,
  rules,
  shouldUnregister,
  type,
  ...textFieldProps
}: Props<T>) => {
  const {
    field: { onChange, value = "", ...field },
    fieldState: { error },
  } = useController({ control, defaultValue, disabled, name, rules, shouldUnregister });

  return (
    <TextField
      {...textFieldProps}
      error={error?.message}
      inputChangeHandler={onChange}
      label={label}
      type={type}
      value={value}
      {...field}
    />
  );
};
