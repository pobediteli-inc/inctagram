"use client";

import { FieldValues, useController, UseControllerProps } from "react-hook-form";
import { RadioGroup, RadioGroupProps } from "../radioGroup/radioGroup";
import { RadioOptionProps } from "common/types";

type Props<TFieldValue extends FieldValues> = Omit<RadioGroupProps, "options" | "value" | "onValueChange" | "name"> &
  UseControllerProps<TFieldValue> & {
    options: RadioOptionProps[];
    disabled?: boolean;
  };

export const ControlledRadioGroup = <T extends FieldValues>({
  control,
  defaultValue,
  disabled,
  name,
  options,
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

  return (
    <RadioGroup {...field} {...rest} value={value} onValueChange={onChange} options={options} disabled={disabled} />
  );
};
