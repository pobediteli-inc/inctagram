import { baseApi } from "../baseApi/baseApi";
import {
  GetNotificationsByProfileRequest,
  GetNotificationsByProfileResponse,
  MarkAsReadRequest,
} from "store/services/api/notifications";
import { handleErrors } from "common/utils/handleErrors";
import { AppDispatch } from "store/store";

export const notificationsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    markAsRead: build.mutation<void, MarkAsReadRequest>({
      query: (args) => ({
        body: { ids: args.ids },
        method: "PUT",
        url: "/v1/notifications/mark-as-read",
      }),
      invalidatesTags: ["Notifications"],
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        const { ids, ...queryParams } = args;

        const patchResult = dispatch(
          notificationsApi.util.updateQueryData("getNotificationsByProfile", queryParams, (draft) => {
            if (!draft) return;

            let updatedCount = 0;

            draft.items.forEach((notification) => {
              if (ids.includes(notification.id) && !notification.isRead) {
                notification.isRead = true;
                updatedCount++;
              }
            });

            if (draft.notReadCount !== undefined) {
              draft.notReadCount = Math.max(0, draft.notReadCount - updatedCount);
            }
          })
        );

        try {
          await queryFulfilled;
        } catch (error) {
          patchResult.undo();
          dispatch(notificationsApi.util.invalidateTags(["Notifications"]));
          handleErrors(error, dispatch as AppDispatch);
        }
      },
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
      providesTags: (result) =>
        result
          ? [
              ...result.items.map(({ id }) => ({ type: "Notifications" as const, id })),
              { type: "Notifications", id: "LIST" },
            ]
          : [{ type: "Notifications", id: "LIST" }],
    }),

    deleteNotificationById: build.mutation<void, number>({
      query: (id) => ({
        url: `/v1/notifications/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Notifications", id }],
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          handleErrors(error, dispatch as AppDispatch);
        }
      },
    }),
  }),
});

export const { useMarkAsReadMutation, useGetNotificationsByProfileQuery, useDeleteNotificationByIdMutation } =
  notificationsApi;
