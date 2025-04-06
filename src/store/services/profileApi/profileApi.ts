import { baseQueryUpdateToken } from "store/services/baseApi/baseApi";
import { createApi } from "@reduxjs/toolkit/query/react";
import { User, UserByUserName } from "store/services/profileApi/profileApi.types";

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
    getProfileByUserName: build.query<UserByUserName, { userName: string }>({
      query: ({ userName }) => ({
        url: `users/${userName}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetProfileQuery, useGetProfileByUserNameQuery } = profileApi;
