import { BaseQueryApi, createApi, FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import process from "process";
import { AccessResponse } from "store/services/api/auth";

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

export const baseQueryUpdateToken = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: object) => {
  if (typeof args === "object" && (args.url === "auth/update-tokens" || args.url === "auth/logout"))
    return baseQuery(args, api, extraOptions);

  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) return baseQuery(args, api, extraOptions);

  let response = await baseQuery(args, api, extraOptions);

  if (response.error?.status === 401) {
    const refreshToken = await baseQuery(
      {
        url: "/update-tokens",
        method: "POST",
      },
      api,
      extraOptions
    );

    if (refreshToken.data && (refreshToken.data as AccessResponse).accessToken) {
      localStorage.setItem("accessToken", (refreshToken.data as AccessResponse).accessToken);
      response = await baseQuery(args, api, extraOptions);
    } else {
      const { authApi } = await import("store/services/api/auth/authApi");
      await api.dispatch(authApi.endpoints.logOut.initiate());
    }
  }

  return response;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryUpdateToken,
  tagTypes: ["Posts"],
  endpoints: () => ({}),
});
