export type DeletePostArgs = {
  postId: string;
};

export type UpdatePostArgs = {
  description: string;
  postId: string;
};

export interface CreatePostArgs {
  description: string;
  childrenMetadata: { uploadId: string; isMain: boolean }[];
}

export type UploadImageArgs = {
  files: File[];
};

export interface UploadImageResponse {
  images: {
    url: string;
    width: number;
    height: number;
    fileSize: number;
    createdAt: string;
    uploadId: string;
  }[];
}
