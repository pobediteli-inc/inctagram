import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  LoginRequest,
  LoginResponse,
  ConfirmRegistrationArgs,
  RegistrationArgs,
  ResendRegistrationEmailArgs,
} from "./authApi.types";
import { MeResponse } from "store/services/auth/authApi.types";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://inctagram.work/api/v1/auth",
    credentials: "include",
    prepareHeaders: (headers) => {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
      }
      return headers;
    },
  }),
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
    confirmRegistration: build.mutation<void, ConfirmRegistrationArgs>({
      query: (args) => ({
        body: args,
        method: "POST",
        url: `/registration-confirmation`,
      }),
    }),
    login: build.mutation<LoginResponse, LoginRequest>({
      query: (args) => ({
        url: "/login",
        method: "POST",
        body: args,
      }),
    }),
    me: build.query<MeResponse, void>({
      query: () => ({
        url: "/me",
        method: "GET",
      }),
    }),
    logOut: build.mutation<void, void>({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useResendRegistrationEmailMutation,
  useConfirmRegistrationMutation,
  useLoginMutation,
  useMeQuery,
  useLogOutMutation,
} = authApi;
