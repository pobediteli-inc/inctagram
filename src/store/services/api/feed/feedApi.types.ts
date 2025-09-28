import { PostData } from "store/services/api/posts";

export type GetPublicationsArgs = {
  pageSize?: number;
  pageNumber?: number;
  endCursorPostId?: number;
};

export type GetPublicationsResponse = {
  totalCount: number;
  pagesCount: number;
  page: number;
  pageSize: number;
  prevCursor: number;
  nextCursor: number;
  items: PostData[];
};
