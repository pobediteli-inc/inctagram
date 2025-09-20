import { baseApi } from "../baseApi/baseApi";
import { handleErrors } from "common/utils/handleErrors";
import { AppDispatch } from "store/store";
import {
  GetMessagesByUserRequest,
  GetMessagesRequest,
  MessagesResponse,
  UpdateMessageStatusRequest,
} from "store/services/api/messenger";

export const messengerApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMessages: build.query<MessagesResponse, GetMessagesRequest>({
      query: ({ cursor, pageSize, searchName }) => {
        const queryParams = new URLSearchParams();

        if (cursor !== undefined) queryParams.append("cursor", cursor.toString());
        if (pageSize !== undefined) queryParams.append("pageSize", pageSize.toString());
        if (searchName) queryParams.append("searchName", searchName);

        const queryString = queryParams.toString();
        return {
          url: `/v1/messenger${queryString ? `?${queryString}` : ""}`,
          method: "GET",
        };
      },
      transformResponse: (response: MessagesResponse): MessagesResponse => ({
        ...response,
        notReadCount: response.notReadCount ?? 0, // ✅ гарантируем число
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.items.map(({ id }) => ({ type: "MessengerMessage" as const, id })),
              { type: "Messenger", id: "LIST" },
            ]
          : [{ type: "Messenger", id: "LIST" }],
    }),

    getMessagesByUser: build.query<MessagesResponse, GetMessagesByUserRequest>({
      query: ({ dialoguePartnerId, cursor, pageSize, searchName }) => {
        const queryParams = new URLSearchParams();

        if (cursor !== undefined) queryParams.append("cursor", cursor.toString());
        if (pageSize !== undefined) queryParams.append("pageSize", pageSize.toString());
        if (searchName) queryParams.append("searchName", searchName);

        const queryString = queryParams.toString();
        return {
          url: `/v1/messenger/${dialoguePartnerId}${queryString ? `?${queryString}` : ""}`,
          method: "GET",
        };
      },
      transformResponse: (response: MessagesResponse): MessagesResponse => ({
        ...response,
        notReadCount: response.notReadCount ?? 0, // ✅ всегда возвращаем число
      }),
      providesTags: (result, error, { dialoguePartnerId }) =>
        result
          ? [
              ...result.items.map(({ id }) => ({
                type: "MessengerMessage" as const,
                id: `${dialoguePartnerId}-${id}`,
              })),
              { type: "Messenger", id: `USER-${dialoguePartnerId}` },
            ]
          : [{ type: "Messenger", id: `USER-${dialoguePartnerId}` }],
    }),

    updateMessageStatus: build.mutation<void, UpdateMessageStatusRequest>({
      query: (args) => ({
        body: { ids: args.ids },
        method: "PUT",
        url: "/v1/messenger",
      }),
      invalidatesTags: ["Messenger", "MessengerMessage"],
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          handleErrors(error, dispatch as AppDispatch);
        }
      },
    }),

    deleteMessage: build.mutation<void, number>({
      query: (id) => ({
        url: `/v1/messenger/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "MessengerMessage", id },
        { type: "Messenger", id: "LIST" },
      ],
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

export const {
  useGetMessagesQuery,
  useGetMessagesByUserQuery,
  useUpdateMessageStatusMutation,
  useDeleteMessageMutation,
} = messengerApi;
