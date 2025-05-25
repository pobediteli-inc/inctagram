import { BusinessAccountProps, ProviderProps } from "common/types";

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

export type PaymentsViewModel = {
  userId: number;
  subscriptionId: string;
  dateOfPayment: string;
  endDateOfSubscription: string;
  price: number;
  subscriptionType: BusinessAccountProps;
  paymentType: ProviderProps;
};

export type GetPaymentsResponse = PaymentsViewModel[];
