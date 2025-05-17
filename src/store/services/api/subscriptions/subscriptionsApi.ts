import { baseApi } from "store/services/api/baseApi/baseApi";
import { GetPaymentsResponse } from "store/services/api/subscriptions/subscriptionsApi.types";

export const subscriptionsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPayments: build.query<GetPaymentsResponse, void>({
      query: () => ({
        url: "subscriptions/my-payments",
        method: "GET",
      }),
      providesTags: [{ type: "Payments", id: "LIST" }],
    }),
  }),
});

export const { useGetPaymentsQuery } = subscriptionsApi;
