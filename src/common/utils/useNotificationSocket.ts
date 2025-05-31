import { useEffect } from "react";
import { getSocket } from "common/utils/socket";
import { useAppDispatch } from "common/hooks/useAppDispatch";
import { addNotification } from "store/services/slices/notificationSlice";
import { useAppSelector } from "common/hooks/useAppSelector";
import { selectIsLoggedIn } from "store/services/slices/authSlice";

export const useNotificationSocket = (accessToken: string) => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  useEffect(() => {
    if (!isLoggedIn || !accessToken) return;

    const socket = getSocket();

    socket.on("notifications", (data) => {
      dispatch(addNotification(data));
    });

    return () => {
      socket.off("notifications");
    };
  }, [accessToken, dispatch, isLoggedIn]);
};
