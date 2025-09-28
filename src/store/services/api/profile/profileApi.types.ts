export type User = {
  aboutMe: string;
  avatars: UserAvatar[];
  city: string;
  country: string;
  createdAt: string;
  dateOfBirth: string;
  firstName: string;
  id: number;
  lastName: string;
  region: string;
  userName: string;
};

export type UserAvatar = {
  createdAt: string;
  fileSize: number;
  height: number;
  url: string;
  width: number;
};

export type UserByUserName = {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  city: string;
  country: string;
  region: string;
  dateOfBirth?: string;
  aboutMe: string;
  avatars: UserAvatar[];
  isFollowing: boolean;
  isFollowedBy: boolean;
  followingCount: number;
  followersCount: number;
  publicationsCount: number;
};

export type UpdateProfileArgs = {
  userName: string;
  firstName: string | null;
  lastName: string | null;
  city: string | null;
  country: string | null;
  dateOfBirth: Date | null;
  aboutMe: string | null;
};

export type UploadAvatarResponse = {
  avatars: UserAvatar[];
};

export type ErrorMessage = {
  message: string;
  field: string;
};

export type UpdateProfileErrorResponse = {
  statusCode: number;
  messages?: ErrorMessage[];
  error?: string;
};
