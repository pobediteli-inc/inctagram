import { io, Socket } from "socket.io-client";
import { WS_EVENT_PATH } from "common/enums/enums";

// Глобальная переменная для хранения сокета
let socket: Socket | null = null;

export const createSocket = (accessToken: string): Socket => {
  if (socket && socket.connected) {
    return socket;
  }

  // Отключаем старый сокет если он существует
  if (socket) {
    socket.disconnect();
  }

  socket = io(process.env.NEXT_PUBLIC_SOCKET_HOST || "", {
    auth: {
      token: accessToken,
    },
    query: { accessToken },
    autoConnect: true,
    transports: ["websocket", "polling"], // Добавляем оба транспорта для надежности
  });

  socket.on("connect", () => {
    console.log("Socket connected, id:", socket?.id);
  });

  socket.on("connect_error", (err) => {
    console.error("Socket connect error:", err.message);
  });

  socket.on(WS_EVENT_PATH.ERROR, (err) => {
    console.error("Socket application error:", err);
    // Можно добавить обработку специфических ошибок приложения
  });

  socket.on("disconnect", (reason) => {
    console.log("Socket disconnected:", reason);
  });

  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

// Функция для получения текущего сокета
export const getSocket = (): Socket | null => {
  return socket;
};
