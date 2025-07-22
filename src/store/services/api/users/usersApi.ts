import { baseApi } from "../baseApi/baseApi";
import { GetUsersArgs, GetUsersResponse } from "./usersApi.types";

export const usersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query<GetUsersResponse, GetUsersArgs>({
      query: ({ search, pageSize = 12, pageNumber = 1, cursor }) => {
        const params = new URLSearchParams();
        if (search) params.append("search", search);
        if (pageSize) params.append("pageSize", String(pageSize));
        if (pageNumber) params.append("pageNumber", String(pageNumber));
        if (cursor) params.append("cursor", String(cursor));

        return {
          url: `/v1/users?${params.toString()}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useLazyGetUsersQuery } = usersApi;
