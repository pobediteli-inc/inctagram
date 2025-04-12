export type GetPostByIdArgs = {
  postId: number;
};

export type DeletePostArgs = {
  postId: number;
};

export type UpdatePostArgs = {
  description: string;
  postId: number;
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
  owner: Owner;
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

export type Owner = {
  firstName: string;
  lastName: string;
};

export type CreatePostArgs = {
  description: string;
  childrenMetadata: { uploadId: string; isMain: boolean }[];
};

export type UploadImageArgs = {
  files: File[];
};

export type UploadImageResponse = {
  images: {
    url: string;
    width: number;
    height: number;
    fileSize: number;
    createdAt: string;
    uploadId: string;
  }[];
};

export type PostsWithMeta = {
  pageSize: number;
  totalCount: number;
  notReadCount: number;
  items: Post[];
};
