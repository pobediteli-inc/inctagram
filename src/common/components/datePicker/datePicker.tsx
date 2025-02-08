"use client";

import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../popover/popover";
import { Calendar } from "../calendar/calendar";
import s from "./datePicker.module.css";
import { CalendarOutline } from "../../../assets/icons";
import { DayPicker } from "react-day-picker";
import { addDays, format } from "date-fns";

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
          <Calendar mode="single" selected={date} onSelect={setDate} />
        </PopoverContent>
      </Popover>
    </div>
  );
};

// DateRange: { from: Date | undefined; to: Date; }
// type PropsDateRange = {
//   startDate:	Date | undefined
//   endDate: Date | null
// }
// type PropsRangeMode = {
//   selected: any
//   // onSelect: OnSelectHandler<T>: (selected, triggerDate, modifiers, e) => void
//   onSelect: OnSelectHandler<DateRange | undefined>
// }

export const DatePickerRange = () => {
  const currentDate = new Date();
  const defaultSelected = {
    from: currentDate,
    to: addDays(currentDate, 4),
  };
  // const [range, setRange] = useState<[any, any]>(defaultSelected);
  const [range, setRange] = useState<[Date | null, Date | null]>([currentDate, defaultSelected.to]);

  return (
    <div>
      <div className={s.text}>Date select</div>
      <Popover>
        <PopoverTrigger asChild>
          <div className={s.datePicker}>
            {/*<div>{range?.from?.toLocaleDateString()} - {range?.to.toLocaleDateString()}</div>*/}
            <CalendarOutline width={"24px"} height={"24px"} />
          </div>
        </PopoverTrigger>
        <PopoverContent>
          <Calendar
            mode="range"
            defaultMonth={currentDate}
            // selected={range}
            // onSelect={setRange}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};