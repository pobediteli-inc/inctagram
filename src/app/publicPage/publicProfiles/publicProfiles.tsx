"use client";
import s from "./publicProfiles.module.css";
import { PublicProfile } from "app/publicPage/publicProfiles/publicProfile/publicProfile";
import { useGetAllPublicPostsQuery } from "store/services/api/publicPosts";

export const PublicProfiles = () => {
  const { data } = useGetAllPublicPostsQuery();

  return (
    <div className={s.mainWrapper}>
      <PublicProfile data={data} />
    </div>
  );
};
