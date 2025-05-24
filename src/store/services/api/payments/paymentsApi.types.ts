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
};

type PaymentSubscriptionArgs = {
  userId: number;
  subscriptionId: string;
  dateOfPayment: string;
  endDateOfSubscription: string;
  autoRenewal: boolean;
};

export type SubscriptionType = "MONTHLY" | "YEARLY" | "WEEKLY";

export type PaymentType = "STRIPE" | "PAYPAL" | "CREDIT_CARD";

export type PaymentsViewModel = {
  userId: number;
  subscriptionId: string;
  dateOfPayment: string;
  endDateOfSubscription: string;
  price: number;
  subscriptionType: SubscriptionType;
  paymentType: PaymentType;
};

export type GetPaymentsResponse = PaymentsViewModel[];
