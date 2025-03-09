export type RegistrationArgs = {
  userName: string;
  email: string;
  password: string;
  baseUrl?: string;
};

export type RegistrationServerError = {
  data: {
    statusCode: number;
    messages: [
      {
        message: string;
        field: string;
      },
    ];
    error: string;
  };
  status: number;
};

export type ResendRegistrationEmailArgs = {
  email: string;
  baseUrl?: string;
};

export type ConfirmRegistrationResponse = {
  statusCode: number;
  messages: ConfirmRegistrationMessage[];
  error: string;
};

export type ConfirmRegistrationMessage = {
  message: string;
  field: string;
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
  recoveryCode: string
};
