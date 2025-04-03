import {baseQueryUpdateToken} from "store/services/baseApi/baseApi";
import {createApi} from "@reduxjs/toolkit/query/react";

type User = {
  aboutMe: string;
  avatars: UserAvatar[];
  city: string;
  country: string;
  createdAt: string;
  dateOfBirth: string;
  firstName: string;
  id: number;
  lastName: string;
  region: string;
  userName: string;
};

type UserAvatar = {
  createdAt: string;
  fileSize: number;
  height: number;
  url: string;
  width: number;
};

type UserByUserName = {
	id: number;
	userName: string;
	firstName: string;
	lastName: string;
	city: string;
	country: string;
	region: string;
	dateOfBirth?: string;
	aboutMe: string;
	avatars: UserAvatar[];
	isFollowing: boolean;
	isFollowedBy: boolean;
	followingCount: number;
	followersCount: number;
	publicationsCount: number;
}

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: baseQueryUpdateToken,
  endpoints: (build) => ({
    getProfile: build.query<User, void>({
      query: () => ({
        url: "users/profile",
        method: "GET",
      }),
    }),
    getProfileByUserName: build.query<UserByUserName, {userName: string}>({
      query: ({userName}) => ({
        url: `users/${userName}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetProfileQuery, useGetProfileByUserNameQuery } = profileApi;