"use client";

import { FieldValues, UseControllerProps, useController } from "react-hook-form";
import { Checkbox, CheckboxProps } from "../checkbox/checkbox";

export type Props<TFieldValues extends FieldValues> = Omit<CheckboxProps, "id" | "onChange" | "value"> &
  UseControllerProps<TFieldValues>;

export const ControlledCheckbox = <T extends FieldValues>({
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

  return <Checkbox {...rest} checked={!!value} disabled={disabled} onCheckedChange={onChange} {...field} />;
};
