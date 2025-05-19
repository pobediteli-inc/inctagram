export type PaymentRequest = {
  typeSubscription: string;
  paymentType: string;
  amount: number;
  baseUrl: string;
};

export type PaymentResponse = {
  url: string;
};
