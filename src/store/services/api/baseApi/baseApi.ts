import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { tokenExpiration } from "common/utils/decoder";
import process from "process";
import { AccessResponse } from "store/services/api/auth";
import { setStatus } from "store/services/slices";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_LOCAL_BASE_URL,
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

  if (tokenExpiration(accessToken)) {
    const refreshToken = await baseQuery(
      {
        url: "auth/update-tokens",
        method: "POST",
      },
      api,
      extraOptions
    );
    if (refreshToken.data && (refreshToken.data as AccessResponse).accessToken) {
      localStorage.setItem("accessToken", (refreshToken.data as AccessResponse).accessToken);
    } else {
      api.dispatch(setStatus({ status: "error", message: "Failed to refresh token." }));
      const { authApi } = await import("store/services/api/auth/authApi");
      await api.dispatch(authApi.endpoints.logOut.initiate());
    }
  }

  return baseQuery(args, api, extraOptions);
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryUpdateToken,
  tagTypes: ["Posts"],
  endpoints: () => ({}),
});
