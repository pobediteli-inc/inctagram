import { baseApi } from "store/services/api/baseApi/baseApi";
import {
  ProfileIdRequest,
  PublicUserProfileResponse,
  TotalCountRequest,
} from "store/services/api/publicUser/publicUserApi.types";

export const publicUserApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPublicUsersCount: build.query<TotalCountRequest, void>({
      query: () => ({
        url: "public-user",
        method: "GET",
      }),
    }),
    getPublicUserProfile: build.query<PublicUserProfileResponse, ProfileIdRequest>({
      query: ({ profileId }) => ({
        url: `public-user/profile/${profileId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetPublicUsersCountQuery, useGetPublicUserProfileQuery } = publicUserApi;
