"use client";

import { FieldValues, useController, UseControllerProps } from "react-hook-form";
import { Select, SelectProps } from "../select/select";

export type Props<TFieldValues extends FieldValues> = Omit<SelectProps, "id" | "onValueChange" | "value"> &
  UseControllerProps<TFieldValues>;

export const ControlledSelect = <T extends FieldValues>({
  control,
  defaultValue,
  disabled,
  name,
  rules,
  shouldUnregister,
  ...rest
}: Props<T>) => {
  const {
    field: { onChange, value, ...field },
  } = useController({
    control,
    defaultValue,
    disabled,
    name,
    shouldUnregister,
    rules,
  });

  return <Select {...rest} value={value} disabled={disabled} onValueChange={onChange} {...field} />;
};
