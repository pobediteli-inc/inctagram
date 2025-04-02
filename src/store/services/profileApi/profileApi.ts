import {baseApi} from "store/services/baseApi/baseApi"

type User = {
  aboutMe: string
  avatars: UserAvatar[]
  city: string
  country: string
  createdAt: string
  dateOfBirth: string
  firstName: string
  id: number
  lastName: string
  region: string
  userName: string
}

type UserAvatar = {
  createdAt: string
  fileSize: number
  height: number
  url: string
  width: number
}

export const profileApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
      getProfile: build.query<User, void>({
      query: () => ({
        url: "users/profile",
        method: "GET",
      }),
    })
  }),
});

export const {useGetProfileQuery} =  profileApi;