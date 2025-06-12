import { useEffect, useRef } from "react";
import { useAppDispatch } from "common/hooks/useAppDispatch";
import { NotificationType } from "common/types";
import { createSocket, disconnectSocket } from "common/socket/createSocket";
import { notificationsApi } from "store/services/api/notifications";
import { WS_EVENT_PATH } from "common/enums/enums";
import { debounce } from "lodash";
export const useNotificationSocket = ({ isLoggedIn }: { isLoggedIn: boolean | null }) => {
  const dispatch = useAppDispatch();
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    if (!isLoggedIn) return;

    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) return;

    const broadcastChannel = new BroadcastChannel("notifications");
    const socket = createSocket(accessToken);

    const debouncedUpdate = debounce((notification: NotificationType) => {
      dispatch(
        notificationsApi.util.updateQueryData(
          "getNotificationsByProfile",
          { pageSize: 50, sortDirection: "desc" },
          (draft) => {
            const alreadyExists = draft.items.some((item) => item.id === notification.id);
            if (!alreadyExists) {
              draft.items.unshift(notification);
              if (draft.notReadCount !== undefined) {
                draft.notReadCount += 1;
              }
            }
          }
        )
      );
    }, 300);

    const handleNotification = (notification: NotificationType) => {
      debouncedUpdate(notification);
      broadcastChannel.postMessage({ type: "new-notification", notification });
    };

    const handleBroadcastMessage = (event: MessageEvent) => {
      if (event.data.type === "new-notification") {
        debouncedUpdate(event.data.notification);
      }
    };

    if (!hasFetchedRef.current) {
      dispatch(notificationsApi.util.invalidateTags(["Notifications"]));
      hasFetchedRef.current = true;
    }

    socket.on(WS_EVENT_PATH.NOTIFICATIONS, handleNotification);
    broadcastChannel.addEventListener("message", handleBroadcastMessage);

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        dispatch(notificationsApi.util.invalidateTags(["Notifications"]));
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      socket.off(WS_EVENT_PATH.NOTIFICATIONS, handleNotification);
      broadcastChannel.removeEventListener("message", handleBroadcastMessage);
      broadcastChannel.close();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      debouncedUpdate.cancel();
      disconnectSocket();
    };
  }, [isLoggedIn, dispatch]);
};
