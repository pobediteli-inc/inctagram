import { baseApi } from "store/services/api/baseApi/baseApi";
import {
  AllPublicPostsResponse,
  CommentsResponse,
  PostItemsResponse,
  PostIdRequest,
  UserIdRequest,
} from "store/services/api/publicPosts/publicPostsApi.types";

export const publicPostsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllPublicPosts: build.query<AllPublicPostsResponse, void>({
      query: () => ({
        url: `public-posts/all`,
        method: "GET",
      }),
    }),
    getAllPublicPostsByUserId: build.query<AllPublicPostsResponse, UserIdRequest>({
      query: ({ userId, endCursorPostId }) => ({
        url: `public-posts/user/${userId}/${endCursorPostId}`,
        method: "GET",
      }),
    }),
    getPostById: build.query<PostItemsResponse, PostIdRequest>({
      query: ({ postId }) => ({
        url: `public-posts/${postId}`,
        method: "GET",
      }),
    }),
    getCommentsByPostId: build.query<CommentsResponse, PostIdRequest>({
      query: ({ postId }) => ({
        url: `public-posts/${postId}/comments`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAllPublicPostsQuery,
  useGetAllPublicPostsByUserIdQuery,
  useGetPostByIdQuery,
  useGetCommentsByPostIdQuery,
} = publicPostsApi;
