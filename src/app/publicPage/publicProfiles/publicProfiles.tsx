import s from "./publicProfiles.module.css";
import { PublicProfile } from "app/publicPage/publicProfiles/publicProfile/publicProfile";
import { AllPublicPostsResponse } from "store/services/api/publicPosts";
import { Typography } from "common/components";

export const PublicProfiles = async () => {
  const publicPostsResponse = await getPublicPosts(4);

  if (!publicPostsResponse)
    return (
      <Typography variant={"h3"} color={"light"} asChild>
        <span>No data available</span>
      </Typography>
    );

  return (
    <div className={s.mainWrapper}>
      <PublicProfile publicPosts={publicPostsResponse} />
    </div>
  );
};

const getPublicPosts = async (pageSize: number): Promise<AllPublicPostsResponse | undefined> => {
  try {
    const sortDirection = "desc";
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}public-posts/all?pageSize=${pageSize}&sortDirection=${sortDirection}`,
      {
        method: "GET",
        cache: "no-cache",
      }
    );

    return await response.json();
  } catch {
    return undefined;
  }
};
