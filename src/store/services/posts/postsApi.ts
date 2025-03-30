import { baseApi } from "../baseApi/baseApi";
import { CreatePostArgs, DeletePostArgs, UpdatePostArgs, UploadImagePostArgs } from "./postsApi.types";
import { BaseQueryArg } from "@reduxjs/toolkit/query";

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
    createPost: build.mutation<void, CreatePostArgs>({
      query: ({description, childrenMetadata}) => ({
        url: `posts`,
        method: "POST",
        body: { description, childrenMetadata },
      }),
    }),
    uploadImagePost: build.mutation<void, UploadImagePostArgs>({
      query: ({images}) => {
        const formData = new FormData();
        images.forEach((image, index) => {
          formData.append(`images[${index}][url]`, image.url);
          formData.append(`images[${index}][width]`, image.width.toString());
          formData.append(`images[${index}][height]`, image.height.toString());
          formData.append(`images[${index}][fileSize]`, image.fileSize.toString());
          formData.append(`images[${index}][createdAt]`, image.createdAt);
          formData.append(`images[${index}][uploadId]`, image.uploadId);
        });
        return {
          url: `posts/image`,
          method: "POST",
          body: formData,
        };
      }
    }),
  }),
});

export const {
  useUpdatePostMutation,
  useDeletePostMutation,
  useCreatePostMutation,
  useUploadImagePostMutation
} = postsApi;
