export type GetUsersArgs = {
  search?: string;
  pageSize?: number;
  pageNumber?: number;
  cursor?: number;
};

export type GetUserArgs = {
  userName: string;
};

export type FollowUserArgs = {
  selectedUserId: number;
};

export type UnfollowUserArgs = {
  userId: number;
};

export type Avatar = {
  url: string;
  width: number;
  height: number;
  fileSize: number;
  createdAt: string;
};

export type UserItem = {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  avatars: Avatar[];
  createdAt: string;
};

export type GetUsersResponse = {
  totalCount: number;
  pagesCount: number;
  page: number;
  pageSize: number;
  prevCursor: number;
  nextCursor: number;
  items: UserItem[];
};
