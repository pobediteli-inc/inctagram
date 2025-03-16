import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LoginArgs, LoginResponse, ConfirmRegistrationArgs, CheckRecoveryCodeArgs, NewPasswordArgs, PasswordRecoveryArgs, RegistrationArgs, ResendPasswordRecoveryArgs, ResendRegistrationEmailArgs } from "./authApi.types";

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
    confirmRegistration: build.mutation<void, ConfirmRegistrationArgs>({
      query: (args) => ({
        body: args,
        method: "POST",
        url: `/registration-confirmation`,
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
    login: build.mutation<LoginResponse, LoginArgs>({
      query: (args) => ({
        url: "/login",
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
} = authApi;
