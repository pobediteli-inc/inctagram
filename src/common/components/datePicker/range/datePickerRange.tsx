"use client";

import * as React from "react";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../../popover/popover";
import { Calendar } from "../calendar/calendar";
import s from "../datePicker.module.css";
import { CalendarOutline } from "../../../../assets/icons";
import { DateRange } from "react-day-picker";
import { addDays, format } from "date-fns";

// type VariantProps = "single" | "range";

export const DatePickerWithRange = () => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 2),
  });

  return (
    <div>
      <div className={s.text}>Date range</div>
      <Popover>
        <PopoverTrigger asChild>
          <div className={s.datePicker}>
            {date?.from ? (
              date.to ? (
                <>
                  {date.from.toLocaleDateString()} - {date.to.toLocaleDateString()}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
            <CalendarOutline width={"24px"} height={"24px"} />
          </div>
        </PopoverTrigger>
        <PopoverContent>
          <div className={s.wrapperCalendar}>
            <Calendar mode="range" defaultMonth={date?.from} selected={date} onSelect={setDate} numberOfMonths={1} />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
