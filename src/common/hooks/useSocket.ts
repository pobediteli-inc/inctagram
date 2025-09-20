import { useEffect, useRef } from "react";
import { useAppDispatch } from "common/hooks/useAppDispatch";
import { createSocket, disconnectSocket } from "common/socket/createSocket";
import { messengerApi, MessageSocket } from "store/services/api/messenger";
import { debounce } from "lodash";
import { Socket } from "socket.io-client";

// Глобальная переменная для хранения единственного экземпляра сокета
let globalSocket: Socket | null = null;

type UseSocketProps = {
  isLoggedIn: boolean | null;
  myUserId: number | null;
};

export const useSocket = ({ isLoggedIn, myUserId }: UseSocketProps): Socket | null => {
  const dispatch = useAppDispatch();
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!isLoggedIn || !myUserId) return;

    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) return;

    // Используем глобальный сокет или создаем новый
    if (!globalSocket) {
      globalSocket = createSocket(accessToken);
    }

    socketRef.current = globalSocket;

    const debouncedMessageUpdate = debounce((message: MessageSocket) => {
      const companionId = message.receiverId === myUserId ? message.ownerId : message.receiverId;

      dispatch(
        messengerApi.util.updateQueryData("getMessagesByUser", { dialoguePartnerId: companionId }, (draft) => {
          if (draft && !draft.items.find((m) => m.id === message.id)) {
            draft.items.push(message);
            draft.totalCount += 1;
            draft.notReadCount += message.ownerId !== myUserId ? 1 : 0;
          }
        })
      );
    }, 50);

    const handleMessage = (message: MessageSocket) => {
      debouncedMessageUpdate(message);
    };

    // Убедимся, что слушатель не добавляется многократно
    socketRef.current.off("receive-message", handleMessage);
    socketRef.current.on("receive-message", handleMessage);

    return () => {
      socketRef.current?.off("receive-message", handleMessage);
      debouncedMessageUpdate.cancel();
    };
  }, [isLoggedIn, myUserId, dispatch]);

  return socketRef.current;
};
