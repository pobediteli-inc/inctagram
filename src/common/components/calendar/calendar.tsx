"use client";

import { DayPicker } from "react-day-picker";
import { ComponentProps } from "react";
import "./calendar.styles.css";
import s from "./calendar.module.css";

export type CalendarProps = ComponentProps<typeof DayPicker>;

export const Calendar = ({ showOutsideDays = true, ...props }: CalendarProps) => {
  return (
    <div className={s.wrapper}>
      <DayPicker
        showOutsideDays={showOutsideDays}
        {...props}
      />
    </div>

  );
};

Calendar.displayName = "Calendar";
