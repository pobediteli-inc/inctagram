"use client";

import { FieldValues, useController, UseControllerProps } from "react-hook-form";
import { DatePickerSingle, DatePickerSingleProps } from "../datePicker/single/datePickerSingle";

type Props<T extends FieldValues> = UseControllerProps<T> & Omit<DatePickerSingleProps, "value" | "onDateChange">;

export const ControlledDatePicker = <T extends FieldValues>({ control, name, label, ...restProps }: Props<T>) => {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ name, control });

  return (
    <div>
      <DatePickerSingle value={value} onDateChange={onChange} label={label} {...restProps} />
      {error && <p style={{ color: "red" }}>{error.message}</p>}
    </div>
  );
};
