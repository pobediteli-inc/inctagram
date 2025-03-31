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
  LoginGoogleArgs,
  GoogleResponse,
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
        url: `/password-recovery`,
      }),
    }),
    resendPasswordRecovery: build.mutation<void, ResendPasswordRecoveryArgs>({
      query: (args) => ({
        body: args,
        method: "POST",
        url: `/password-recovery-resending`,
      }),
    }),
    newPassword: build.mutation<void, NewPasswordArgs>({
      query: (args) => ({
        body: args,
        method: "POST",
        url: `/new-password`,
      }),
    }),
    checkRecoveryCode: build.mutation<void, CheckRecoveryCodeArgs>({
      query: (args) => ({
        body: args,
        method: "POST",
        url: `/check-recovery-code`,
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
    loginGoogle: build.mutation<GoogleResponse, LoginGoogleArgs>({
      query: (args) => ({
        url: "auth/google/login",
        method: "POST",
        body: args,
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
  useLoginGoogleMutation,
} = authApi;
