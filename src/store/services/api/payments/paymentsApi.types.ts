export type PaymentRequest = {
  typeSubscription: string;
  paymentType: string;
  amount: number;
  baseUrl: string;
};

export type PaymentResponse = {
  url: string;
};

export type PaymentSubscriptionResponse = {
  data: PaymentSubscriptionArgs[];
  hasAutoRenewal: boolean;
};

type PaymentSubscriptionArgs = {
  userId: number;
  subscriptionId: string;
  dateOfPayment: string;
  endDateOfSubscription: string;
  autoRenewal: boolean;
};
