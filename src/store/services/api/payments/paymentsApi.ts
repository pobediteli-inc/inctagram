import { baseApi } from "../baseApi/baseApi";
import { GetPaymentsResponse, PaymentRequest, PaymentResponse, PaymentSubscriptionResponse } from "./paymentsApi.types";

export const paymentsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createPayment: build.mutation<PaymentResponse, PaymentRequest>({
      query: (args) => ({
        body: args,
        method: "POST",
        url: "/v1/subscriptions",
      }),
    }),
    currentPaymentSubscriptions: build.query<PaymentSubscriptionResponse, void>({
      query: () => ({
        method: "GET",
        url: "/v1/subscriptions/current-payment-subscriptions",
      }),
      providesTags: ["PaymentSubscriptions"],
    }),
    cancelAutoRenewal: build.mutation<void, void>({
      query: () => {
        return {
          url: "/v1/subscriptions/canceled-auto-renewal",
          method: "POST",
        };
      },
      invalidatesTags: ["PaymentSubscriptions"],
    }),
    getPayments: build.query<GetPaymentsResponse, void>({
      query: () => ({
        url: "/v1/subscriptions/my-payments",
        method: "GET",
      }),
      providesTags: [{ type: "Payments", id: "LIST" }],
    }),
  }),
});

export const {
  useCreatePaymentMutation,
  useCurrentPaymentSubscriptionsQuery,
  useCancelAutoRenewalMutation,
  useGetPaymentsQuery,
} = paymentsApi;
