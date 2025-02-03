import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "../datePicker.module.css";

export const DatePickerSingle = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  return (
    <div>
      <div className={styles["text"]}>Date select</div>
      <DatePicker
        className={styles["datePicker"]}
        // showIcon
        selected={startDate}
        onChange={(date) => setStartDate(date)}
      />
    </div>
  );
};
