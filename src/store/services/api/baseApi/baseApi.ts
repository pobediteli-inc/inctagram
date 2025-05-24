import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import process from "process";
import { AccessResponse } from "store/services/api/auth";
import { setLoggedIn, setStatus } from "store/services/slices";
import { handleErrors } from "common/utils";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  credentials: "include",
  prepareHeaders: (headers) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }

    return headers;
  },
});

export const baseQueryUpdateToken: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: object = {}
) => {
  const accessToken = localStorage.getItem("accessToken");

  if (typeof args === "object" && (args.url === "auth/update-tokens" || args.url === "auth/logout"))
    return baseQuery(args, api, extraOptions);
  if (!accessToken) return baseQuery(args, api, extraOptions);

  let response = await baseQuery(args, api, extraOptions);

  if (response.error?.status === 401) {
    const refreshToken = await baseQuery(
      {
        url: "auth/update-tokens",
        method: "POST",
      },
      api,
      extraOptions
    );
    if (refreshToken.data && (refreshToken.data as AccessResponse).accessToken) {
      response = await baseQuery(args, api, extraOptions);
      localStorage.setItem("accessToken", (refreshToken.data as AccessResponse).accessToken);
      api.dispatch(setLoggedIn({ isLoggedIn: true }));
      api.dispatch(setStatus({ status: "success", message: "Successfully refreshed token." }));
    } else {
      response = await baseQuery(args, api, extraOptions);
      localStorage.removeItem("accessToken");
      handleErrors(response.error, api.dispatch);
      api.dispatch(setLoggedIn({ isLoggedIn: false }));
    }
  } else handleErrors(response.error, api.dispatch);

  return response;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryUpdateToken,
  tagTypes: ["Posts", "Profile", "Payments", "PaymentSubscriptions"],
  endpoints: () => ({}),
});
