export type DeletePostArgs = {
  postId: string;
};

export type UpdatePostArgs = {
  description: string;
  postId: string;
};

export type childMetaDataArgs = {
  uploadId: string;
};

export type CreatePostArgs = {
  description: string;
  childrenMetadata: childMetaDataArgs[];
};

export type ImageArgs = {
  url: string;
  width: number;
  height: number;
  fileSize: number;
  createdAt: string;
  uploadId: string;
};

export type UploadImagePostArgs = {
  images: ImageArgs[];
};
