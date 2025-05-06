"use client";

import * as React from "react";
import { DayPicker, DayPickerProps } from "react-day-picker";
import { Popover, PopoverContent, PopoverTrigger } from "../../popover/popover";
import clsx from "clsx";
import "react-day-picker/style.css";
import { sharedDatePickerClassNames } from "../datePickerClassnames";
import s from "../datePicker.module.css";
import { CalendarOutline } from "assets/icons";

export type DatePickerSingleProps = {
  value?: Date;
  onDateChange: (date: Date) => void;
  label?: string;
} & Omit<DayPickerProps, "mode" | "selected" | "onSelect">;

export const DatePickerSingle = ({
  value,
  onDateChange,
  label = "Select Date",
  ...restProps
}: DatePickerSingleProps) => {
  const handleSelect = (date: Date | undefined) => {
    if (date) {
      onDateChange(date);
    }
  };

  return (
    <div>
      <div className={s.text}>{label}</div>
      <Popover>
        <PopoverTrigger asChild>
          <div className={clsx(s.datePicker)}>
            <div>{value ? value.toLocaleDateString() : "Select date"}</div>
            <CalendarOutline width="24px" height="24px" />
          </div>
        </PopoverTrigger>
        <PopoverContent>
          <div className={s.wrapperCalendar}>
            <DayPicker
              mode="single"
              selected={value}
              onSelect={handleSelect}
              ISOWeek
              showOutsideDays
              classNames={sharedDatePickerClassNames}
              {...restProps}
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
