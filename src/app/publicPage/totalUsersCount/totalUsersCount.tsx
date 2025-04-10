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
      <span>{digit}</span>
      {index < totalCountString.length - 1 && <span className={s.separator} />}
    </Fragment>
  ));

  return (
    <Typography variant={"h2"} color={"light"}>
      <div className={s.mainWrapper}>
        <div>Registered users:</div>
        <div className={s.totalUser}>{totalUsers}</div>
      </div>
    </Typography>
  );
};
