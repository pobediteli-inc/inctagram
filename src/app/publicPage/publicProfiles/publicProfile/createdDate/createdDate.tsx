"use client";

import s from "./createdDate.module.css";
import { FC, useEffect, useState } from "react";
import { NullableProps } from "common/types";
import { Typography } from "common/components";

export const CreatedDate: FC<Props> = ({ createdAt }) => {
  const [timeAgo, setTimeAgo] = useState<NullableProps<string>>(null);

  useEffect(() => {
    const calculateDiffTime = () => {
      const currentDate = new Date();
      const serverDate = new Date(createdAt);
      const diffDate = currentDate.getTime() - serverDate.getTime();

      const seconds = Math.floor(diffDate / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      const months = Math.floor(days / 30);

      if (days >= 60) setTimeAgo(`${months} month${months > 1 ? "s" : ""} ago`);
      else if (days > 0) setTimeAgo(`${days} day${days > 1 ? "s" : ""} ago`);
      else if (hours > 0) setTimeAgo(`${hours} hour${hours > 1 ? "s" : ""} ago`);
      else if (minutes > 0) setTimeAgo(`${minutes} minute${minutes > 1 ? "s" : ""} ago`);
      else setTimeAgo(`${seconds} second${seconds !== 1 ? "s" : ""} ago`);
    };
    calculateDiffTime();

    const intervalId = setInterval(calculateDiffTime, 1000);

    return () => clearInterval(intervalId);
  }, [createdAt]);

  return (
    <Typography variant={"small"} color={"dark"} asChild>
      <span className={s.date}>{timeAgo}</span>
    </Typography>
  );
};

type Props = {
  createdAt: string;
};
