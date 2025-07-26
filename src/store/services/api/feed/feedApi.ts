import { baseApi } from "../baseApi/baseApi";
import { GetPublicationsArgs, GetPublicationsResponse } from "store/services/api/feed/feedApi.types";

const feedApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getFollowedPublications: build.query<GetPublicationsResponse, GetPublicationsArgs>({
      query: ({ pageSize = 12, pageNumber = 1, endCursorPostId }) => {
        const params = new URLSearchParams();
        if (pageSize) params.append("pageSize", String(pageSize));
        if (pageNumber) params.append("pageNumber", String(pageNumber));
        if (endCursorPostId) params.append("endCursorPostId", String(endCursorPostId));

        return {
          url: `/v1/home/publications-followers${params.toString()}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetFollowedPublicationsQuery } = feedApi;
