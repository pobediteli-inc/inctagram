import { NullableProps } from "common/types";

export type TotalCountRequest = {
  totalCount: NullableProps<number>;
};

export type ProfileIdRequest = {
  profileId: NullableProps<number>;
};

export type PublicUserProfileResponse = {
  id: string;
  userName: string;
  aboutMe: string;
  avatars: AvatarArgs[];
  userMetadata: MetaDataArgs;
  hasPaymentSubscription: boolean;
};

export type AvatarArgs = {
  url: string;
  width: number;
  height: number;
  fileSize: number;
  createdAt: string;
};

export type MetaDataArgs = {
  following: number;
  followers: number;
  publications: number;
};
