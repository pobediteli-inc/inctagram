import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryUpdateToken } from "store/services/baseApi/baseApi";
import { PostsWithMeta } from "store/services/posts/postsApi.types";

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: baseQueryUpdateToken,
  endpoints: (build) => ({
    getPostsByUserName: build.query<PostsWithMeta, { userName: string; pageSize: number; pageNumber: number }>({
      query: ({ userName, pageSize, pageNumber }) => ({
        url: `posts/${userName}?pageSize=${pageSize}&pageNumber=${pageNumber}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetPostsByUserNameQuery } = postsApi;
