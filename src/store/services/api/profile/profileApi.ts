import { baseApi } from "store/services/api/baseApi/baseApi";
import {
  UpdateProfileArgs,
  UploadAvatarResponse,
  User,
  UserByUserName,
} from "store/services/api/profile/profileApi.types";

export const profileApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProfile: build.query<User, void>({
      query: () => ({
        url: "users/profile",
        method: "GET",
      }),
    }),
    getProfileByUserName: build.query<UserByUserName, { userName: string }>({
      query: ({ userName }) => ({
        url: `users/${userName}`,
        method: "GET",
      }),
      providesTags: () => ["Profile"],
    }),
    updateProfile: build.mutation<void, UpdateProfileArgs>({
      query: (args) => ({
        body: args,
        method: "PUT",
        url: `users/profile`,
      }),
    }),
    uploadAvatar: build.mutation<UploadAvatarResponse, File>({
      query: (avatar) => {
        const formData = new FormData();
        formData.append("file", avatar);
        return {
          url: "users/profile/avatar",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: () => ["Profile"],
    }),
    deleteProfileAvatar: build.mutation<void, void>({
      query: () => ({
        method: "DELETE",
        url: `users/profile/avatar`,
      }),
    }),
  }),
});

export const {
  useGetProfileQuery,
  useGetProfileByUserNameQuery,
  useUpdateProfileMutation,
  useUploadAvatarMutation,
  useDeleteProfileAvatarMutation,
} = profileApi;
