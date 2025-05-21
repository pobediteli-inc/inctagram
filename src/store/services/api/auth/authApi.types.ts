import { MessageField } from "../baseApi/baseApi.types";

export type RegistrationArgs = {
  userName: string;
  email: string;
  password: string;
  baseUrl?: string;
};

export type RegistrationServerError = {
  data: {
    statusCode: number;
    messages: MessageField[];
    error: string;
  };
  status: number;
};

export type ResendRegistrationEmailArgs = {
  email: string;
  baseUrl?: string;
};

export type PasswordRecoveryArgs = {
  email: string;
  recaptcha: string;
  baseUrl?: string;
};

export type ResendPasswordRecoveryArgs = {
  email: string;
  baseUrl?: string;
};

export type NewPasswordArgs = {
  newPassword: string;
  recoveryCode: string;
};

export type CheckRecoveryCodeArgs = {
  recoveryCode: string;
};

export type ConfirmRegistrationArgs = {
  confirmationCode: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type AccessResponse = {
  accessToken: string;
};

export type MeResponse = {
  userId: number;
  userName: string;
  email: string;
  isBlocked: boolean;
};

export type SocialAuthRequest = {
  redirectUrl?: string;
  code?: string;
};

export type SocialAuthResponse = {
  accessToken: string;
  email: string;
};
