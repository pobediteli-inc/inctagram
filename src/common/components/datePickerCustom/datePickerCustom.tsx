import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./datePickerCustom.module.css"

export const DatePickerCustom = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  return (
    <div>
      <div className={styles["text"]}>
        Date select
      </div>
      <DatePicker className={styles["datePickerCustom"]}
        // showIcon
        selected={startDate}
        onChange={(date) => setStartDate(date)}
      />
    </div>

  );
};