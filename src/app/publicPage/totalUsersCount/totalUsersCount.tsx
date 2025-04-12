import s from "./totalUsersCount.module.css";
import { Typography } from "common/components";
import { Fragment } from "react";
import { AllPublicPostsResponse } from "store/services/api/publicPosts";

export const TotalUsersCount = async () => {
  const data = await getTotalUsersCount();

  if (!data)
    return (
      <Typography variant={"h3"} color={"light"} asChild>
        <span>No data available</span>
      </Typography>
    );

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

const getTotalUsersCount = async (): Promise<AllPublicPostsResponse | undefined> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}public-user`, {
      method: "GET",
      cache: "no-cache",
    });

    return await response.json();
  } catch {
    return undefined;
  }
};
