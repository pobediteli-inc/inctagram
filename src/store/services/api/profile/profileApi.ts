import { baseApi } from "store/services/api/baseApi/baseApi";
import { User, UserByUserName } from "store/services/api/profile/profileApi.types";

export const profileApi = baseApi.injectEndpoints({
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
