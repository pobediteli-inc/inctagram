import { useEffect } from "react";
import { useAppDispatch } from "common/hooks/useAppDispatch";
import { NotificationType } from "common/types";
import { createSocket, disconnectSocket } from "common/socket/createSocket";
import { notificationsApi } from "store/services/api/notifications";
import { WS_EVENT_PATH } from "common/enums/enums";

export const useNotificationSocket = ({ isLoggedIn }: { isLoggedIn: boolean | null }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isLoggedIn) return;

    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) return;

    const socket = createSocket(accessToken);

    const handleNotification = (notification: NotificationType) => {
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
    };

    socket.on(WS_EVENT_PATH.NOTIFICATIONS, handleNotification);

    return () => {
      socket.off(WS_EVENT_PATH.NOTIFICATIONS, handleNotification);
      disconnectSocket();
    };
  }, [isLoggedIn, dispatch]);
};
