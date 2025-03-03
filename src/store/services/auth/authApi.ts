import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RegistrationArgs } from "./authApi.types";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://inctagram.work/api/v1/auth" }),
  endpoints: (build) => ({
    registerUser: build.mutation<void, RegistrationArgs>({
      query: (args) => ({
        body: args,
        method: "POST",
        url: `/registration`,
      }),
    }),
  }),
});

export const { useRegisterUserMutation } = authApi;
