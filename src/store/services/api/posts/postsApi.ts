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
        url: `/v1/posts/${postId}`,
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
        url: `/v1/posts/${postId}`,
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
        url: `/v1/posts`,
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
          url: `/v1/posts/image`,
          method: "POST",
          body: formData,
        };
      },
    }),
    getPostById: build.query<Post, GetPostByIdArgs>({
      query: ({ postId }) => ({
        url: `/v1/posts/id/${postId}`,
      }),
    }),
    getPostsByUserName: build.query<PostsWithMeta, { userName: string; pageSize: number; pageNumber: number }>({
      query: ({ userName, pageSize, pageNumber }) => ({
        url: `/v1/posts/${userName}`,
        params: { pageSize, pageNumber },
      }),
      providesTags: (result) =>
        result
          ? [...result.items.map(({ id }) => ({ type: "Posts" as const, id })), { type: "Posts", id: "LIST" }]
          : [{ type: "Posts", id: "LIST" }],
    }),
    getPostComments: build.query({
      query: ({ postId }) => ({
        url: `/v1/posts/${postId}/comments`,
      }),
      providesTags: (result, error, { postId }) =>
        result ? [{ type: "Comments", id: postId }] : [{ type: "Comments", id: "LIST" }],
    }),
    getCommentAnswers: build.query({
      query: ({ postId, commentId }) => ({
        url: `/v1/posts/${postId}/comments/${commentId}/answers`,
      }),
      providesTags: (result, error, { commentId }) =>
        result ? [{ type: "Answers", id: commentId }] : [{ type: "Answers", id: "LIST" }],
    }),
    createComment: build.mutation({
      query: ({ postId, content }) => ({
        url: `/v1/posts/${postId}/comments`,
        method: "POST",
        body: { content },
      }),
      invalidatesTags: (result, error, { postId }) => [{ type: "Comments", id: postId }],
    }),
    createAnswerComment: build.mutation({
      query: ({ postId, commentId, content }) => ({
        url: `/v1/posts/${postId}/comments/${commentId}/answers`,
        method: "POST",
        body: { content },
      }),
      invalidatesTags: (result, error, { commentId }) => [{ type: "Answers", id: commentId }],
    }),
    updateLikeStatusComment: build.mutation({
      query: ({ postId, commentId, likeStatus }) => ({
        url: `/v1/posts/${postId}/comments/${commentId}/like-status`,
        method: "PUT",
        body: { likeStatus },
      }),
      invalidatesTags: (result, error, { postId }) => [{ type: "Comments", id: postId }],
    }),
    updateLikeStatusAnswer: build.mutation({
      query: ({ postId, commentId, answerId, likeStatus }) => ({
        url: `/v1/posts/${postId}/comments/${commentId}/answers/${answerId}/like-status`,
        method: "PUT",
        body: { likeStatus },
      }),
      invalidatesTags: (result, error, { commentId }) => [{ type: "Answers", id: commentId }],
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
  useGetPostCommentsQuery,
  useGetCommentAnswersQuery,
  useCreateCommentMutation,
  useCreateAnswerCommentMutation,
  useUpdateLikeStatusCommentMutation,
  useUpdateLikeStatusAnswerMutation,
} = postsApi;
