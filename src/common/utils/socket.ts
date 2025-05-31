import { io, Socket } from "socket.io-client";

let socket: Socket;

export const connectSocket = (accessToken: string) => {
  socket = io("https://inctagram.work", {
    query: { accessToken },
  });
};

export const getSocket = (): Socket => socket;
