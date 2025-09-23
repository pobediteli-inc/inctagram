import { useEffect, useRef } from "react";
import { useAppDispatch } from "common/hooks/useAppDispatch";
import { createSocket, disconnectSocket } from "common/socket/createSocket";
import { messengerApi, MessageSocket } from "store/services/api/messenger";
import { notificationsApi, NotificationType } from "store/services/api/notifications";
import { SORT_DIRECTIONS, WS_EVENT_PATH } from "common/enums/enums";
import { debounce } from "lodash";
import { DEFAULT_NOTIFICATIONS_PAGE_SIZE } from "common/constants/pagination";
import { Socket } from "socket.io-client";

type UseSocketProps = {
  isLoggedIn: boolean | null;
  myUserId: number | null;
};

export const useSocket = ({ isLoggedIn, myUserId }: UseSocketProps): Socket | null => {
  const dispatch = useAppDispatch();
  const socketRef = useRef<Socket | null>(null);
  const broadcastRef = useRef<BroadcastChannel | null>(null);
  const fetchedNotifications = useRef(false);
  const [updateMessageStatus] = messengerApi.useUpdateMessageStatusMutation();

  useEffect(() => {
    if (!isLoggedIn || !myUserId) return;

    const token = localStorage.getItem("accessToken");
    if (!token) return;

    socketRef.current = createSocket(token);
    broadcastRef.current ??= new BroadcastChannel("notifications");

    const updateMessages = debounce((msg: MessageSocket) => {
      if (!myUserId) return;
      const companionId = msg.receiverId === myUserId ? msg.ownerId : msg.receiverId;

      dispatch(
        messengerApi.util.updateQueryData("getMessagesByUser", { dialoguePartnerId: companionId }, (draft) => {
          const existing = draft.items.find((m) => m.id === msg.id);
          if (existing) {
            existing.status = msg.status;
            existing.messageText = msg.messageText;
          } else {
            draft.items.push(msg);
          }
          draft.items.sort((a, b) => +new Date(a.createdAt) - +new Date(b.createdAt));
          draft.totalCount = draft.items.length;
          draft.notReadCount = draft.items.filter((m) => m.ownerId !== myUserId && m.status !== "READ").length;
        })
      );

      // Обновляем статус сообщения на сервере при получении
      if (msg.receiverId === myUserId && msg.status === "SENT") {
        // Отправляем подтверждение получения через сокет
        socketRef.current?.emit(WS_EVENT_PATH.MESSAGE_SEND, {
          message: msg.messageText,
          receiverId: msg.ownerId,
        });

        // Обновляем статус через API
        updateMessageStatus({ ids: [msg.id] }).catch(console.error);
      }
    }, 50);

    const updateNotifications = debounce((n: NotificationType) => {
      dispatch(
        notificationsApi.util.updateQueryData(
          "getNotificationsByProfile",
          { pageSize: DEFAULT_NOTIFICATIONS_PAGE_SIZE, sortDirection: SORT_DIRECTIONS.desc },
          (draft) => {
            if (!draft.items.some((item) => item.id === n.id)) {
              draft.items.unshift(n);
              if (draft.notReadCount !== undefined) draft.notReadCount += 1;
            }
          }
        )
      );
    }, 300);

    if (!fetchedNotifications.current) {
      dispatch(notificationsApi.util.invalidateTags(["Notifications"]));
      fetchedNotifications.current = true;
    }

    const handleBroadcast = (e: MessageEvent) => {
      if (e.data.type === "new-notification") updateNotifications(e.data.notification);
    };

    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        dispatch(notificationsApi.util.invalidateTags(["Notifications"]));
      }
    };

    socketRef.current.on(WS_EVENT_PATH.RECEIVE_MESSAGE, updateMessages);
    socketRef.current.on(WS_EVENT_PATH.MESSAGE_SEND, updateMessages);
    socketRef.current.on(WS_EVENT_PATH.UPDATE_MESSAGE, updateMessages);
    socketRef.current.on(WS_EVENT_PATH.NOTIFICATIONS, (n) => {
      updateNotifications(n);
      broadcastRef.current?.postMessage({ type: "new-notification", notification: n });
    });

    broadcastRef.current.addEventListener("message", handleBroadcast);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      Object.values(WS_EVENT_PATH).forEach((evt) => socketRef.current?.off(evt));
      broadcastRef.current?.removeEventListener("message", handleBroadcast);
      broadcastRef.current?.close();
      document.removeEventListener("visibilitychange", handleVisibility);
      updateMessages.cancel();
      updateNotifications.cancel();
      disconnectSocket();
    };
  }, [isLoggedIn, myUserId, dispatch, updateMessageStatus]);

  return socketRef.current;
};
