import { useEffect, useRef } from "react";
import { useAppDispatch } from "common/hooks/useAppDispatch";
import { createSocket, disconnectSocket } from "common/socket/createSocket";
import { MessageSocket, messengerApi } from "store/services/api/messenger";
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
  const broadcastChannelRef = useRef<BroadcastChannel | null>(null);
  const hasFetchedNotificationsRef = useRef(false);

  useEffect(() => {
    if (!isLoggedIn || !myUserId) return;

    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) return;

    socketRef.current = createSocket(accessToken);

    if (!broadcastChannelRef.current) {
      broadcastChannelRef.current = new BroadcastChannel("notifications");
    }

    const debouncedMessageUpdate = debounce((message: MessageSocket) => {
      if (!myUserId) return;
      const companionId = message.receiverId === myUserId ? message.ownerId : message.receiverId;

      dispatch(
        messengerApi.util.updateQueryData("getMessagesByUser", { dialoguePartnerId: companionId }, (draft) => {
          const existing = draft.items.find((m) => m.id === message.id);
          if (!existing) draft.items.push(message);
          else {
            existing.status = message.status;
            existing.messageText = message.messageText;
          }
          draft.items.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
          draft.totalCount = draft.items.length;
          draft.notReadCount = draft.items.filter((m) => m.ownerId !== myUserId && m.status !== "READ").length;
        })
      );

      if (message.receiverId === myUserId && message.status === "SENT") {
        socketRef.current?.emit(WS_EVENT_PATH.MESSAGE_SEND, {
          message: message.messageText,
          receiverId: message.ownerId,
        });
      }
    }, 50);

    const debouncedNotificationUpdate = debounce((notification: NotificationType) => {
      dispatch(
        notificationsApi.util.updateQueryData(
          "getNotificationsByProfile",
          { pageSize: DEFAULT_NOTIFICATIONS_PAGE_SIZE, sortDirection: SORT_DIRECTIONS.desc },
          (draft) => {
            const exists = draft.items.some((item) => item.id === notification.id);
            if (!exists) {
              draft.items.unshift(notification);
              if (draft.notReadCount !== undefined) draft.notReadCount += 1;
            }
          }
        )
      );
    }, 300);

    const handleSocketMessage = (message: MessageSocket) => {
      debouncedMessageUpdate(message);
    };
    const handleNotification = (notification: NotificationType) => {
      debouncedNotificationUpdate(notification);
      broadcastChannelRef.current?.postMessage({ type: "new-notification", notification });
    };
    const handleBroadcastMessage = (event: MessageEvent) => {
      if (event.data.type === "new-notification") debouncedNotificationUpdate(event.data.notification);
    };

    if (!hasFetchedNotificationsRef.current) {
      dispatch(notificationsApi.util.invalidateTags(["Notifications"]));
      hasFetchedNotificationsRef.current = true;
    }

    socketRef.current.on(WS_EVENT_PATH.RECEIVE_MESSAGE, handleSocketMessage);
    socketRef.current.on(WS_EVENT_PATH.MESSAGE_SEND, handleSocketMessage);
    socketRef.current.on(WS_EVENT_PATH.UPDATE_MESSAGE, handleSocketMessage);
    socketRef.current.on(WS_EVENT_PATH.NOTIFICATIONS, handleNotification);

    socketRef.current.on(WS_EVENT_PATH.ERROR, (err: unknown) => console.error("Socket error:", err));

    broadcastChannelRef.current.addEventListener("message", handleBroadcastMessage);

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        dispatch(notificationsApi.util.invalidateTags(["Notifications"]));
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      socketRef.current?.off(WS_EVENT_PATH.RECEIVE_MESSAGE, handleSocketMessage);
      socketRef.current?.off(WS_EVENT_PATH.MESSAGE_SEND, handleSocketMessage);
      socketRef.current?.off(WS_EVENT_PATH.UPDATE_MESSAGE, handleSocketMessage);
      socketRef.current?.off(WS_EVENT_PATH.NOTIFICATIONS, handleNotification);
      socketRef.current?.off(WS_EVENT_PATH.ERROR);

      broadcastChannelRef.current?.removeEventListener("message", handleBroadcastMessage);
      broadcastChannelRef.current?.close();

      document.removeEventListener("visibilitychange", handleVisibilityChange);

      debouncedMessageUpdate.cancel();
      debouncedNotificationUpdate.cancel();

      disconnectSocket();
    };
  }, [isLoggedIn, myUserId, dispatch]);

  return socketRef.current;
};
