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
    currentPaymentSubscriptions: build.query<PaymentSubscriptionResponse, void>({
      query: () => ({
        method: "GET",
        url: "subscriptions/current-payment-subscriptions",
      }),
      providesTags: ["PaymentSubscriptions"],
    }),
    cancelAutoRenewal: build.mutation<void, void>({
      query: () => {
        return {
          url: "subscriptions/canceled-auto-renewal",
          method: "POST",
        };
      },
      invalidatesTags: ["PaymentSubscriptions"],
    }),
  }),
});

export const { useCreatePaymentMutation, useCurrentPaymentSubscriptionsQuery, useCancelAutoRenewalMutation } =
  paymentsApi;
