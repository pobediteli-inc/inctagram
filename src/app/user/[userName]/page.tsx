"use client";

import Profile from "common/components/profile/profile";
import { useFollowUserMutation, useGetUserQuery, useUnfollowUserMutation } from "store/services/api/users";
import { useParams } from "next/navigation";

export default function User() {
  const params = useParams();

  const userName = typeof params?.userName === "string" ? params.userName : "";

  const { data: profileData } = useGetUserQuery({ userName });

  const [follow] = useFollowUserMutation();
  const [unfollow] = useUnfollowUserMutation();

  if (!profileData) return <div>User not found</div>;
  return (
    <Profile
      profileData={profileData}
      follow={() => follow({ selectedUserId: profileData.id })}
      unfollow={() => unfollow({ userId: profileData.id })}
    />
  );
}
