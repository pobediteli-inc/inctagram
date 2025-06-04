import { io, Socket } from "socket.io-client";
import { handleSocketError } from "common/utils/handleSocketError";
import { WS_EVENT_PATH } from "common/enums/enums";

let socket: Socket | null = null;

export const createSocket = (accessToken: string): Socket => {
  if (socket) return socket;

  socket = io(process.env.NEXT_PUBLIC_SOCKET_HOST || "", {
    query: { accessToken },
    autoConnect: true,
  });

  socket.on("connect", () => {});

  socket.on("connect_error", handleSocketError);

  socket.on(WS_EVENT_PATH.ERROR, handleSocketError);

  socket.on("disconnect", (reason) => {
    handleSocketError(reason);
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
