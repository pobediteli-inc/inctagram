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
