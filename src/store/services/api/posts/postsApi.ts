import { baseApi } from "../baseApi/baseApi";
import {
  CreatePostArgs,
  DeletePostArgs,
  GetPostByIdArgs,
  Post,
  PostsWithMeta,
  UpdatePostArgs,
  UploadImageArgs,
  UploadImageResponse,
} from "store/services/api/posts/postsApi.types";

export const postsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    updatePost: build.mutation<void, UpdatePostArgs>({
      query: ({ postId, description }) => ({
        url: `posts/${postId}`,
        method: "PUT",
        body: { description },
      }),
      invalidatesTags: (result, error, { postId }) => [
        { type: "Posts", id: postId },
        { type: "Posts", id: "LIST" },
      ],
    }),
    deletePost: build.mutation<void, DeletePostArgs>({
      query: ({ postId }) => ({
        url: `posts/${postId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, postId) => [
        { type: "Posts", id: String(postId) },
        { type: "Posts", id: "LIST" },
        "Profile",
      ],
    }),
    createPost: build.mutation<{ postId: string }, CreatePostArgs>({
      query: ({ description, childrenMetadata }) => ({
        url: `posts`,
        method: "POST",
        body: { description, childrenMetadata },
      }),
      invalidatesTags: () => [{ type: "Posts", id: "LIST" }, "Profile"],
    }),
    uploadImagePost: build.mutation<UploadImageResponse, UploadImageArgs>({
      query: ({ files }) => {
        const formData = new FormData();
        files.forEach((file) => formData.append("file", file));
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
      }),
    }),
    getPostsByUserName: build.query<PostsWithMeta, { userName: string; pageSize: number; pageNumber: number }>({
      query: ({ userName, pageSize, pageNumber }) => ({
        url: `/posts/${userName}`,
        params: { pageSize, pageNumber },
      }),
      providesTags: (result) =>
        result
          ? [...result.items.map(({ id }) => ({ type: "Posts" as const, id })), { type: "Posts", id: "LIST" }]
          : [{ type: "Posts", id: "LIST" }],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetPostsByUserNameQuery,
  useUpdatePostMutation,
  useDeletePostMutation,
  useCreatePostMutation,
  useUploadImagePostMutation,
  useGetPostByIdQuery,
} = postsApi;
