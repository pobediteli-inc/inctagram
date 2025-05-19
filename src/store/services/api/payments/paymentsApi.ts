import { baseApi } from "../baseApi/baseApi";
import { PaymentRequest, PaymentResponse } from "./paymentsApi.types";

export const paymentsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createPayment: build.mutation<PaymentResponse, PaymentRequest>({
      query: (args) => ({
        body: args,
        method: "POST",
        url: "subscriptions",
      }),
    }),
  }),
});

export const { useCreatePaymentMutation } = paymentsApi;
