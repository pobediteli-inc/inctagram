import { baseApi } from "../baseApi/baseApi";
import { PaymentRequest, PaymentResponse, PaymentSubscriptionResponse } from "./paymentsApi.types";

export const paymentsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createPayment: build.mutation<PaymentResponse, PaymentRequest>({
      query: (args) => ({
        body: args,
        method: "POST",
        url: "subscriptions",
      }),
    }),
    currentPaymentSubscription: build.query<PaymentSubscriptionResponse, void>({
      query: () => ({
        method: "GET",
        url: "subscriptions/current-payment-subscriptions",
      }),
    }),
  }),
});

export const { useCreatePaymentMutation, useCurrentPaymentSubscriptionQuery } = paymentsApi;
