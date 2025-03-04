export type RegistrationArgs = {
  userName: string;
  email: string;
  password: string;
  baseUrl?: string;
};

export type ResendRegistrationEmailArgs = {
  email: string;
  baseUrl?: string;
};
