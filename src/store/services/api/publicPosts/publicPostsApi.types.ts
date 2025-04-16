import { SortDirectionProps } from "common/types/SortDirectionProps/SortDirectionProps";

export type PostIdRequest = {
  postId: number;
};

export type UserIdRequest = {
  userId: number;
} & AllPublicPostsRequest;

export type AllPublicPostsRequest = {
  endCursorPostId?: number;
  pageSize?: number;
  pageNumber?: number;
  sortBy?: string;
  sortDirection?: SortDirectionProps;
};

export type AllPublicPostsResponse = {
  totalCount: number;
  pageSize: number;
  totalUsers: number;
  items?: PostItemsResponse[];
};

export type PostItemsResponse = {
  id: number;
  userName: string;
  description: string;
  location: string;
  images: ImagesArgs[];
  createdAt: string;
  updatedAt: string;
  ownerId: number;
  avatarOwner?: string;
  owner: OwnerArgs[];
  likesCount: number;
  isLiked: boolean;
  avatarWhoLikes: boolean;
};

export type ImagesArgs = {
  url: string;
  width: number;
  height: number;
  fileSize: number;
  createdAt: string;
  uploadId: string;
};

export type OwnerArgs = {
  firstName: string;
  lastName: string;
};

export type CommentsResponse = {
  pageSize: number;
  totalCount: number;
  notReadCount: number;
  items: CommentItems[];
};

export type CommentItems = {
  id: number;
  postId: number;
  from: CommentAuthor;
  content: string;
  createdAt: string;
  answerCount: number;
  likeCount: number;
  isLiked: boolean;
};

export type CommentAuthor = {
  id: number;
  username: string;
  avatars: AvatarArgs[];
};

export type AvatarArgs = Record<string, unknown>;
