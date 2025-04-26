"use client";

import { FieldValues, useController, UseControllerProps } from "react-hook-form";
import { DatePickerSingle, DatePickerSingleProps } from "../datePicker/single/datePickerSingle";

type Props<T extends FieldValues> = UseControllerProps<T> & Omit<DatePickerSingleProps, "value" | "onDateChange">;

export const ControlledDatePicker = <T extends FieldValues>({ control, name, label }: Props<T>) => {
  const {
    field: { value, onChange },
  } = useController({ name, control });

  return <DatePickerSingle value={value} onDateChange={onChange} label={label} />;
};
