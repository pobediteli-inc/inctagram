import { io, Socket } from "socket.io-client";
import { store } from "store/store";
import { addNotification } from "store/services/slices/notificationSlice";
import { NotificationItem } from "store/services/api/notifications";

let socket: Socket | null = null;

export const connectSocket = (accessToken: string) => {
  socket = io(process.env.NEXT_PUBLIC_SOCKET_HOST || "", {
    path: process.env.NEXT_PUBLIC_SOCKET_PATH || "/ws",
    auth: { accessToken },
    transports: ["websocket"],
    autoConnect: true,
  });

  socket.on("connect", () => {
    console.log("🔌 Connected to WebSocket");
  });

  socket.on("disconnect", (reason) => {
    console.warn("⚠️ WebSocket disconnected:", reason);
  });

  socket.on("connect_error", (err) => {
    console.error("❌ WebSocket connection error:", err.message);
  });
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const getSocket = (): Socket | null => socket;

export const subscribeToNotifications = () => {
  if (!socket) return;

  socket.on("notifications", (notification: NotificationItem) => {
    store.dispatch(addNotification(notification));
  });
};
