"use client";

import * as React from "react";
import { useState } from "react";
import { DateRange, DayPicker, DayPickerProps } from "react-day-picker";
import { Popover, PopoverContent, PopoverTrigger } from "../../popover/popover";
import clsx from "clsx";
import "react-day-picker/style.css";
import { sharedDatePickerClassNames } from "../datePickerClassnames"; // Import the shared classNames utility
import s from "../datePicker.module.css";
import { CalendarOutline } from "assets/icons";

type DatePickerRangeProps = {
  value?: DateRange;
  onDateChange: (date: DateRange) => void;
  label?: string;
} & Omit<DayPickerProps, "mode" | "selected" | "onSelect">;

export const DatePickerRange = ({
  value,
  onDateChange,
  label = "Select Date Range",
  ...restProps
}: DatePickerRangeProps) => {
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>(value);

  const handleSelect = (range: DateRange | undefined) => {
    if (range) {
      setSelectedRange(range);
      onDateChange(range);
    }
  };

  const renderRange = () => {
    if (selectedRange?.from && selectedRange.to) {
      return `${selectedRange.from.toLocaleDateString()} - ${selectedRange.to.toLocaleDateString()}`;
    }
    if (selectedRange?.from) {
      return selectedRange.from.toLocaleDateString();
    }
    return "Select date range";
  };

  return (
    <div>
      <div className={s.text}>{label}</div>
      <Popover>
        <PopoverTrigger asChild>
          <div className={clsx(s.datePicker)}>
            <div>{renderRange()}</div>
            <CalendarOutline width="24px" height="24px" />
          </div>
        </PopoverTrigger>
        <PopoverContent>
          <div className={s.wrapperCalendar}>
            <DayPicker
              mode="range"
              selected={selectedRange}
              onSelect={handleSelect}
              ISOWeek
              required
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
