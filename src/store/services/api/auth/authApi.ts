import {
  AccessResponse,
  CheckRecoveryCodeArgs,
  ConfirmRegistrationArgs,
  LoginRequest,
  MeResponse,
  NewPasswordArgs,
  PasswordRecoveryArgs,
  RegistrationArgs,
  ResendPasswordRecoveryArgs,
  ResendRegistrationEmailArgs,
  SocialAuthRequest,
  SocialAuthResponse,
} from "store/services/api/auth/authApi.types";
import { baseApi } from "store/services/api/baseApi/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    registerUser: build.mutation<void, RegistrationArgs>({
      query: (args) => ({
        body: args,
        method: "POST",
        url: `/v1/auth/registration`,
      }),
    }),
    resendRegistrationEmail: build.mutation<void, ResendRegistrationEmailArgs>({
      query: (args) => ({
        body: args,
        method: "POST",
        url: `/v1/auth/registration-email-resending`,
      }),
    }),
    confirmRegistration: build.mutation<void, ConfirmRegistrationArgs>({
      query: (args) => ({
        body: args,
        method: "POST",
        url: `/v1/auth/registration-confirmation`,
      }),
    }),
    passwordRecovery: build.mutation<void, PasswordRecoveryArgs>({
      query: (args) => ({
        body: args,
        method: "POST",
        url: `/v1/auth/password-recovery`,
      }),
    }),
    resendPasswordRecovery: build.mutation<void, ResendPasswordRecoveryArgs>({
      query: (args) => ({
        body: args,
        method: "POST",
        url: `/v1/auth/password-recovery-resending`,
      }),
    }),
    newPassword: build.mutation<void, NewPasswordArgs>({
      query: (args) => ({
        body: args,
        method: "POST",
        url: `/v1/auth/new-password`,
      }),
    }),
    checkRecoveryCode: build.mutation<void, CheckRecoveryCodeArgs>({
      query: (args) => ({
        body: args,
        method: "POST",
        url: `/v1/auth/check-recovery-code`,
      }),
    }),
    login: build.mutation<AccessResponse, LoginRequest>({
      query: (args) => ({
        url: "/v1/auth/login",
        method: "POST",
        body: args,
      }),
    }),
    me: build.query<MeResponse, void>({
      query: () => ({
        url: "/v1/auth/me",
        method: "GET",
      }),
    }),
    updateTokens: build.mutation<AccessResponse, void>({
      query: () => ({
        url: "/v1/auth/update-tokens",
        method: "POST",
      }),
    }),
    logOut: build.mutation<void, void>({
      query: () => ({
        url: "/v1/auth/logout",
        method: "POST",
      }),
    }),
    authViaGoogle: build.mutation<SocialAuthResponse, SocialAuthRequest>({
      query: (args) => ({
        url: "/v1/auth/google/login",
        method: "POST",
        body: args,
      }),
    }),
    authViaGithub: build.query<SocialAuthResponse, void>({
      query: () => ({
        url: "/v1/auth/github/login",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useResendRegistrationEmailMutation,
  useConfirmRegistrationMutation,
  usePasswordRecoveryMutation,
  useResendPasswordRecoveryMutation,
  useNewPasswordMutation,
  useCheckRecoveryCodeMutation,
  useLoginMutation,
  useMeQuery,
  useLogOutMutation,
  useAuthViaGoogleMutation,
  useAuthViaGithubQuery,
} = authApi;
