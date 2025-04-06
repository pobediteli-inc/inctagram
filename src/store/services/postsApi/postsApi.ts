import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryUpdateToken } from "store/services/baseApi/baseApi";
import { PostsWithMeta } from "store/services/postsApi/postsApi.types";

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: baseQueryUpdateToken,
  endpoints: (build) => ({
    getPostsByUserName: build.query<PostsWithMeta, { userName: string }>({
      query: ({ userName }) => ({
        url: `posts/${userName}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetPostsByUserNameQuery } = postsApi;
