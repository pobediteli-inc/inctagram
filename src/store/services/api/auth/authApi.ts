import {
  MeResponse,
  AccessResponse,
  ConfirmRegistrationArgs,
  LoginRequest,
  RegistrationArgs,
  ResendRegistrationEmailArgs,
  CheckRecoveryCodeArgs,
  NewPasswordArgs,
  PasswordRecoveryArgs,
  ResendPasswordRecoveryArgs,
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
    passwordRecovery: build.mutation<void, PasswordRecoveryArgs>({
      query: (args) => ({
        body: args,
        method: "POST",
        url: `auth/password-recovery`,
      }),
    }),
    resendPasswordRecovery: build.mutation<void, ResendPasswordRecoveryArgs>({
      query: (args) => ({
        body: args,
        method: "POST",
        url: `auth/password-recovery-resending`,
      }),
    }),
    newPassword: build.mutation<void, NewPasswordArgs>({
      query: (args) => ({
        body: args,
        method: "POST",
        url: `auth/new-password`,
      }),
    }),
    checkRecoveryCode: build.mutation<void, CheckRecoveryCodeArgs>({
      query: (args) => ({
        body: args,
        method: "POST",
        url: `auth/check-recovery-code`,
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
    authViaGoogle: build.mutation<SocialAuthResponse, SocialAuthRequest>({
      query: (args) => ({
        url: "auth/google/login",
        method: "POST",
        body: args,
      }),
    }),
    authViaGithub: build.query<SocialAuthResponse, void>({
      query: () => ({
        url: "auth/github/login",
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
