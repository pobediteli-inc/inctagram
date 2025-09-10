"use client";

import { baseApi } from "../baseApi/baseApi";
import { FollowUserArgs, GetUserArgs, GetUsersArgs, GetUsersResponse, UnfollowUserArgs } from "./usersApi.types";
import { UserByUserName } from "store/services/api/profile";

export const usersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query<GetUsersResponse, GetUsersArgs>({
      query: ({ search, pageSize, pageNumber, cursor }) => {
        const params = new URLSearchParams();
        if (search) params.append("search", search);
        if (pageSize) params.append("pageSize", String(pageSize));
        if (pageNumber) params.append("pageNumber", String(pageNumber));
        if (cursor != null) params.append("cursor", String(cursor));

        return {
          url: `/v1/users?${params.toString()}`,
          method: "GET",
        };
      },
    }),
    getUser: build.query<UserByUserName, GetUserArgs>({
      query: ({ userName }) => {
        return {
          url: `/v1/users/${userName}`,
          method: "GET",
        };
      },
      providesTags: ["User"],
    }),
    followUser: build.mutation<void, FollowUserArgs>({
      query: (body) => {
        return {
          url: `/v1/users/following`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["User", "Profile"],
    }),
    unfollowUser: build.mutation<void, UnfollowUserArgs>({
      query: ({ userId }) => {
        return {
          url: `/v1/users/follower/${userId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["User", "Profile"],
    }),
  }),
});

export const { useLazyGetUsersQuery, useGetUserQuery, useFollowUserMutation, useUnfollowUserMutation } = usersApi;
