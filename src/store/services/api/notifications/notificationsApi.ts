import { baseApi } from "../baseApi/baseApi";
import {
  GetNotificationsByProfileRequest,
  GetNotificationsByProfileResponse,
  MarkAsReadRequest,
} from "store/services/api/notifications";

export const notificationsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    markAsRead: build.mutation<void, MarkAsReadRequest>({
      query: (args) => ({
        body: args,
        method: "PUT",
        url: "/v1/notifications/mark-as-read",
      }),
      invalidatesTags: ["Notifications"],
    }),
    getNotificationsByProfile: build.query<GetNotificationsByProfileResponse, GetNotificationsByProfileRequest>({
      query: ({ cursor, sortBy, notifyAt, isRead, pageSize, sortDirection }) => {
        const queryParams = new URLSearchParams();

        if (sortBy) queryParams.append("sortBy", sortBy);
        if (notifyAt) queryParams.append("notifyAt", notifyAt);
        if (isRead !== undefined) queryParams.append("isRead", String(isRead));
        if (pageSize) queryParams.append("pageSize", String(pageSize));
        if (sortDirection) queryParams.append("sortDirection", sortDirection);

        const cursorPart = cursor !== undefined ? `/${cursor}` : "";
        const queryString = queryParams.toString();

        return {
          url: `/v1/notifications${cursorPart}${queryString ? `?${queryString}` : ""}`,
          method: "GET",
        };
      },
      providesTags: ["Notifications"],
    }),
    deleteNotificationById: build.mutation<void, number>({
      query: (id) => ({
        url: `/v1/notifications/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Notifications"],
    }),
  }),
});

export const { useMarkAsReadMutation, useGetNotificationsByProfileQuery, useDeleteNotificationByIdMutation } =
  notificationsApi;
