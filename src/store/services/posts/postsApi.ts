import { baseApi } from "../baseApi/baseApi";
import { DeletePostArgs, GetPostByIdArgs, Post, UpdatePostArgs } from "./postsApi.types";

export const postsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    updatePost: build.mutation<void, UpdatePostArgs>({
      query: ({ postId, description }) => ({
        url: `posts/${postId}`,
        method: "PUT",
        body: { description },
      }),
    }),
    deletePost: build.mutation<void, DeletePostArgs>({
      query: ({ postId }) => ({
        url: `posts/${postId}`,
        method: "DELETE",
      }),
    }),
    getPostById: build.query<Post, GetPostByIdArgs>({
      query: ({ postId }) => ({
        url: `posts/id/${postId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useUpdatePostMutation, useDeletePostMutation, useGetPostByIdQuery } = postsApi;
