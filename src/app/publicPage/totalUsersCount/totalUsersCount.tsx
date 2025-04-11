"use client";
import s from "./totalUsersCount.module.css";
import { Typography } from "common/components";
import { useGetPublicUsersCountQuery } from "store/services/api/publicUser";
import { Fragment } from "react";

export const TotalUsersCount = () => {
  const { data } = useGetPublicUsersCountQuery();

  const totalCount = data?.totalCount || 0;
  const totalCountString = totalCount.toString().padStart(6, "0");
  const totalUsers = totalCountString.split("").map((digit, index) => (
    <Fragment key={`${index}-${digit}`}>
      <Typography variant={"h2"} color={"light"}>
        {digit}
      </Typography>
      {index < totalCountString.length - 1 && <Typography className={s.separator} />}
    </Fragment>
  ));

  return (
    <div className={s.mainWrapper}>
      <Typography variant={"h2"} color={"light"}>
        Registered users:
      </Typography>
      <div className={s.totalUser}>{totalUsers}</div>
    </div>
  );
};
