"use client";

import { useMeQuery } from "store/services/api/auth";
import Profile from "common/components/profile/profile";
import { useGetProfileByUserNameQuery } from "store/services/api/profile";

export default function MyProfile() {
  const { data: meData } = useMeQuery();

  const { data: profileData } = useGetProfileByUserNameQuery({ userName: meData?.userName as string });

  if (!meData?.userName) return null;

  if (!profileData) return null;

  return <Profile isCurrentUser={true} profileData={profileData} />;
}
