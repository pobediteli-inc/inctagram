import { baseApi } from "store/services/api/baseApi/baseApi";
import {
  AllPublicPostsRequest,
  AllPublicPostsResponse,
  CommentsResponse,
  ItemsResponse,
  PostIdRequest,
  UserIdRequest,
} from "store/services/api/publicPosts/publicPostsApi.types";

export const publicPostsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllPublicPosts: build.query<AllPublicPostsResponse, AllPublicPostsRequest>({
      query: ({ endCursorPostId }) => ({
        url: `public-posts/all/${endCursorPostId}`,
        method: "GET",
      }),
    }),
    getAllPostsByUserId: build.query<AllPublicPostsResponse, UserIdRequest>({
      query: ({ userId, endCursorPostId }) => ({
        url: `public-posts/user/${userId}/${endCursorPostId}`,
        method: "GET",
      }),
    }),
    getPostById: build.query<ItemsResponse, PostIdRequest>({
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
