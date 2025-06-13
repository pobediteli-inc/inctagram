"use client";

import { FieldValues, useController, UseControllerProps } from "react-hook-form";
import { AsyncSelect, AsyncSelectProps } from "common/components/select/asyncSelect";

export type ControlledAsyncSelectProps<TFieldValues extends FieldValues> = Omit<
  AsyncSelectProps,
  "value" | "onValueChange" | "id"
> &
  UseControllerProps<TFieldValues>;

export const ControlledAsyncSelect = <T extends FieldValues>({
  control,
  defaultValue,
  disabled,
  name,
  rules,
  shouldUnregister,
  ...rest
}: ControlledAsyncSelectProps<T>) => {
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

  return <AsyncSelect {...rest} value={value ?? null} onChange={onChange} disabled={disabled} {...field} />;
};
