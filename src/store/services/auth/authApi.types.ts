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

export type ConfirmRegistrationResponse = {
  statusCode: number;
  messages: MessageField[];
  error: string;
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

export type LoginServerError = {
  data: {
    statusCode: number;
    messages: string;
    error: string;
  };
};

export type MeResponse = {
  userId: number;
  userName: string;
  email: string;
  isBlocked: boolean;
};

export type BaseServerError = {
  data: {
    statusCode: number;
    messages: MessageField[];
    error: string;
  };
};

export type MessageField = {
  message: string;
  field: string;
};
