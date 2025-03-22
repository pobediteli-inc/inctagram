import {
  AccessResponse,
  ConfirmRegistrationArgs,
  LoginRequest,
  RegistrationArgs,
  ResendRegistrationEmailArgs,
} from "./authApi.types";
import { MeResponse } from "store/services/auth/authApi.types";
import { baseApi } from "store/services/baseApi/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    registerUser: build.mutation<void, RegistrationArgs>({
      query: (args) => ({
        body: args,
        method: "POST",
        url: `auth/registration`,
      }),
    }),
    resendRegistrationEmail: build.mutation<void, ResendRegistrationEmailArgs>({
      query: (args) => ({
        body: args,
        method: "POST",
        url: `auth/registration-email-resending`,
      }),
    }),
    confirmRegistration: build.mutation<void, ConfirmRegistrationArgs>({
      query: (args) => ({
        body: args,
        method: "POST",
        url: `auth/registration-confirmation`,
      }),
    }),
    login: build.mutation<AccessResponse, LoginRequest>({
      query: (args) => ({
        url: "auth/login",
        method: "POST",
        body: args,
      }),
    }),
    me: build.query<MeResponse, void>({
      query: () => ({
        url: "auth/me",
        method: "GET",
      }),
    }),
    updateTokens: build.mutation<AccessResponse, void>({
      query: () => ({
        url: "auth/update-tokens",
        method: "POST",
      }),
    }),
    logOut: build.mutation<void, void>({
      query: () => ({
        url: "auth/logout",
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
