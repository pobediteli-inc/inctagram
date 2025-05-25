import { baseApi } from "../baseApi/baseApi";
import { GetPaymentsResponse, PaymentRequest, PaymentResponse, PaymentSubscriptionResponse } from "./paymentsApi.types";

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
    }),
    getPayments: build.query<GetPaymentsResponse, void>({
      query: () => ({
        url: "subscriptions/my-payments",
        method: "GET",
      }),
      providesTags: [{ type: "Payments", id: "LIST" }],
    }),
  }),
});

export const { useCreatePaymentMutation, useCurrentPaymentSubscriptionsQuery, useGetPaymentsQuery } = paymentsApi;
