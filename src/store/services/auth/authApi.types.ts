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

export type ConfirmRegistrationArgs = {
  confirmationCode: string;
};

export type LoginArgs = {
  email: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
};

export type LoginServerError = {
  data: {
    statusCode: number;
    messages: string;
    error: string;
  };
};
