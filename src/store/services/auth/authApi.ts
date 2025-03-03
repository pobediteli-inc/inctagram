import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RegistrationArgs, ResendRegistrationEmailArgs } from "./authApi.types";

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
    resendRegistrationEmail: build.mutation<void, ResendRegistrationEmailArgs>({
      query: (args) => ({
        body: args,
        method: "POST",
        url: `/registration-email-resending`,
      }),
    }),
  }),
});

export const { useRegisterUserMutation, useResendRegistrationEmailMutation } = authApi;
