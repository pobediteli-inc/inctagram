import { baseApi } from "../baseApi/baseApi";
import { CreatePostArgs, DeletePostArgs, UpdatePostArgs, UploadImageArgs, UploadImageResponse } from "./postsApi.types";

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
    createPost: build.mutation<{ postId: string }, CreatePostArgs>({
      query: ({ description, childrenMetadata }) => ({
        url: `posts`,
        method: "POST",
        body: { description, childrenMetadata },
      }),
    }),
    uploadImagePost: build.mutation<UploadImageResponse, UploadImageArgs>({
      query: ({ files }) => {
        const formData = new FormData();
        files.forEach((file) => formData.append("file", file));

        for (const [key, value] of formData.entries()) {
          console.log("FormData field:", key, value);
        }

        return {
          url: `posts/image`,
          method: "POST",
          body: formData,
        };
      },
    }),
    getPostById: build.query<Post, GetPostByIdArgs>({
      query: ({ postId }) => ({
        url: `posts/id/${postId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useUpdatePostMutation, useDeletePostMutation, useCreatePostMutation, useUploadImagePostMutation, useGetPostByIdQuery } =
  postsApi;
