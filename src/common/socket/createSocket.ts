import { io, Socket } from "socket.io-client";
import { handleSocketError } from "common/utils/handleSocketError";

let socket: Socket | null = null;

export const createSocket = (accessToken: string): Socket => {
  if (socket) return socket;

  socket = io(process.env.NEXT_PUBLIC_SOCKET_HOST || "", {
    query: { accessToken },
    autoConnect: true,
  });

  socket.on("connect", () => {
    console.log("🔌 WebSocket connected");
  });

  socket.on("connect_error", (err) => {
    handleSocketError(err);
  });

  socket.on("disconnect", (reason) => {
    console.warn("⚠️ WebSocket disconnected:", reason);
    socket = null;
  });

  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const getSocket = () => socket;
