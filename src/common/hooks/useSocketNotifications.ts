import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { useAppDispatch } from "common/hooks/useAppDispatch";
import { useAppSelector } from "common/hooks/useAppSelector";
import { selectIsLoggedIn } from "store/services/slices/authSlice";
import { handleSocketError } from "common/utils/handleSocketError";

export const useSocketNotifications = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (!isLoggedIn || !accessToken) {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
      return;
    }

    const socket = io(process.env.NEXT_PUBLIC_SOCKET_HOST || "", {
      path: process.env.NEXT_PUBLIC_SOCKET_PATH || "/ws",
      auth: { accessToken },
      transports: ["websocket"],
      autoConnect: true,
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("🔌 WebSocket connected");
    });

    socket.on("connect_error", (err) => {
      handleSocketError(err);
    });

    socket.on("disconnect", (reason) => {
      console.warn("⚠️ WebSocket disconnected:", reason);
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [isLoggedIn, dispatch]);
};
