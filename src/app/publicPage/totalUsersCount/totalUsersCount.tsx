import s from "app/publicPage/totalUsersCount/totalUsersCount.module.css";
import { Typography } from "common/components";

export const TotalUsersCount = () => {
  return (
    <div className={s.mainWrapper}>
      <Typography variant={"h2"} color={"light"}>
        Registered users:
      </Typography>
      <div className={s.totalCount}>009213</div>
    </div>
  );
};
