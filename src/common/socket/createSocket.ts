import { io, Socket } from "socket.io-client";
import { WS_EVENT_PATH } from "common/enums/enums";

let socket: Socket | null = null;

export const createSocket = (accessToken: string): Socket => {
  if (socket && socket.connected) return socket;
  if (socket) socket.disconnect();

  socket = io(process.env.NEXT_PUBLIC_SOCKET_HOST || "", {
    auth: { token: accessToken },
    query: { accessToken },
    autoConnect: true,
    transports: ["websocket", "polling"],
  });

  socket.on("connect", () => console.log("Socket connected:", socket?.id));
  socket.on("connect_error", (err) => console.error("Socket connect error:", err.message));
  socket.on(WS_EVENT_PATH.ERROR, (err) => console.error("Socket error:", err));
  socket.on("disconnect", (reason) => console.log("Socket disconnected:", reason));

  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const getSocket = (): Socket | null => socket;
