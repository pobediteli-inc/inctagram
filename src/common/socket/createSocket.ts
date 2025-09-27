import { io, Socket } from "socket.io-client";
import { WS_EVENT_PATH } from "common/enums/enums";

let socket: Socket | null = null;

export const createSocket = (accessToken: string): Socket => {
  if (socket?.connected) return socket;

  socket?.disconnect();

  socket = io(process.env.NEXT_PUBLIC_SOCKET_HOST ?? "", {
    auth: { token: accessToken },
    query: { accessToken },
    transports: ["websocket", "polling"],
  });

  socket
    .on("connect", () => console.log("Socket connected:", socket?.id))
    .on("connect_error", (err) => console.error("Socket connect error:", (err as Error)?.message || err))
    .on(WS_EVENT_PATH.ERROR, (err) => console.error("Socket error:", err))
    .on("disconnect", (reason) => console.log("Socket disconnected:", reason));

  return socket;
};

export const disconnectSocket = () => {
  socket?.disconnect();
  socket = null;
};

export const getSocket = () => socket;
