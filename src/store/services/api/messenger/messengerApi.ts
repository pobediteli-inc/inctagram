import { baseApi } from "../baseApi/baseApi";
import { handleErrors } from "common/utils/handleErrors";
import { AppDispatch } from "store/store";
import {
  GetMessagesByUserRequest,
  GetMessagesRequest,
  MessagesResponse,
  UpdateMessageStatusRequest,
} from "store/services/api/messenger";
import { sortMessages } from "common/utils/sortMessages";

const buildQueryParams = (params: Record<string, string | number | undefined>) => {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined) query.append(k, String(v));
  });
  return query.toString();
};

const transformMessages = (response: MessagesResponse): MessagesResponse => ({
  ...response,
  notReadCount: response.notReadCount ?? 0,
  items: sortMessages(response.items ?? []),
});

export const messengerApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMessages: build.query<MessagesResponse, GetMessagesRequest>({
      query: ({ cursor, pageSize, searchName }) => {
        const queryString = buildQueryParams({ cursor, pageSize, searchName });
        return { url: `/v1/messenger${queryString ? `?${queryString}` : ""}`, method: "GET" };
      },
      transformResponse: transformMessages,
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
        const queryString = buildQueryParams({ cursor, pageSize, searchName });
        return { url: `/v1/messenger/${dialoguePartnerId}${queryString ? `?${queryString}` : ""}`, method: "GET" };
      },
      transformResponse: transformMessages,
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
      query: ({ ids }) => ({ url: "/v1/messenger", method: "PUT", body: { ids } }),
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
      query: (id) => ({ url: `/v1/messenger/${id}`, method: "DELETE" }),
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
