import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { deleteCookie, setCookie } from "cookies-next";
import {
  ConfirmRegistrationArgs,
  LoginArgs,
  LoginResponse,
  RegistrationArgs,
  ResendRegistrationEmailArgs,
} from "./authApi.types";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://inctagram.work/api/v1/auth",
    credentials: "include",
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
    login: build.mutation<LoginResponse, LoginArgs>({
      query: (args) => ({
        url: "/login",
        method: "POST",
        body: args,
      }),
      async onQueryStarted(args, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          setCookie("token", data.accessToken, { maxAge: 60 * 60 * 24 });
        } catch (error) {
          console.error("Ошибка авторизации:", error);
        }
      },
    }),
    logout: build.mutation<void, void>({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          deleteCookie("token");
          dispatch(authApi.util.resetApiState());
        } catch (error) {
          console.error("Ошибка выхода:", error);
        }
      },
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useResendRegistrationEmailMutation,
  useConfirmRegistrationMutation,
  useLoginMutation,
  useLogoutMutation,
} = authApi;
