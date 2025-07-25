"use client";

import Profile from "common/components/profile/profile";
import { useGetUserQuery } from "store/services/api/users";
import { useParams } from "next/navigation";

export default function User() {
  const params = useParams();

  const userName = typeof params?.userName === "string" ? params.userName : "";

  const { data: profileData } = useGetUserQuery({ userName });

  if (!profileData) return <div>User not found</div>;
  return <Profile profileData={profileData} />;
}
