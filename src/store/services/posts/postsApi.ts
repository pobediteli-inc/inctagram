import { baseApi } from "../baseApi/baseApi";
import { DeletePostArgs, UpdatePostArgs } from "./postsApi.types";

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
  }),
});

export const { useUpdatePostMutation, useDeletePostMutation } = postsApi;
