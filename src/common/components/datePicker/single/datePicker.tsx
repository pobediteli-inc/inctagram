"use client";

import * as React from "react";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../../popover/popover";
import { Calendar } from "../calendar/calendar";
import s from "../datePicker.module.css";
import { CalendarOutline } from "../../../../assets/icons";

// type VariantProps = "single" | "range";

export const DatePicker = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div>
      <div className={s.text}>Date select</div>
      <Popover>
        <PopoverTrigger asChild>
          <div className={s.datePicker}>
            <div>{date?.toLocaleDateString()}</div>
            <CalendarOutline width={"24px"} height={"24px"} />
          </div>
        </PopoverTrigger>
        <PopoverContent>
          <div className={s.wrapperCalendar}>
            <Calendar mode="single" selected={date} onSelect={setDate} />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};