import s from "./publicProfiles.module.css";
import { PublicProfile } from "app/publicPage/publicProfiles/publicProfile/publicProfile";
import { AllPublicPostsResponse } from "store/services/api/publicPosts";
import { Typography } from "common/components";

export const PublicProfiles = async () => {
  const data = await getData();

  if (!data)
    return (
      <Typography variant={"h3"} color={"light"} asChild>
        <span>No data available</span>
      </Typography>
    );

  return (
    <div className={s.mainWrapper}>
      <PublicProfile data={data} />
    </div>
  );
};

const getData = async (): Promise<AllPublicPostsResponse | undefined> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}public-posts/all`, {
      method: "GET",
      cache: "no-cache",
    });

    return await response.json();
  } catch {
    return undefined;
  }
};
