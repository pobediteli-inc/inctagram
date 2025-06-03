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
        body: { ids: args.ids },
        method: "PUT",
        url: "/v1/notifications/mark-as-read",
      }),
      invalidatesTags: ["Notifications"],
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        const { ids, ...queryParams } = args;

        // Оптимистичное обновление
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

            // Обновляем счетчик непрочитанных
            if (draft.notReadCount !== undefined) {
              draft.notReadCount = Math.max(0, draft.notReadCount - updatedCount);
            }
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
          // Дополнительно инвалидируем кэш при ошибке
          dispatch(notificationsApi.util.invalidateTags(["Notifications"]));
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
    }),
  }),
});

export const { useMarkAsReadMutation, useGetNotificationsByProfileQuery, useDeleteNotificationByIdMutation } =
  notificationsApi;
