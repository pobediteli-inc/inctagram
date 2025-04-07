export type PostsWithMeta = {
  pageSize: number;
  totalCount: number;
  notReadCount: number;
  items: Post[];
};

export type Post = {
  id: number;
  userName: string;
  description: string;
  location: string;
  images: Image[];
  createdAt: string;
  updatedAt: string;
  ownerId: number;
  avatarOwner: string;
  owner: PostOwner;
  likesCount: number;
  isLiked: boolean;
  avatarWhoLikes: boolean;
};

export type Image = {
  url: string;
  width: number;
  height: number;
  fileSize: number;
  createdAt: string;
  uploadId: string;
};

export type PostOwner = {
  firstName: string;
  lastName: string;
};
