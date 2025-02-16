import { DayPicker } from "react-day-picker";
import { ComponentProps } from "react";
import "./calendar.style.css";

export type CalendarProps = ComponentProps<typeof DayPicker>;

export const Calendar = ({ showOutsideDays = true, ...props }: CalendarProps) => {
  return <DayPicker showOutsideDays={showOutsideDays} {...props} />;
};

Calendar.displayName = "Calendar";
