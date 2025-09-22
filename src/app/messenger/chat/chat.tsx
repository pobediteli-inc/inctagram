"use client";

import { useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";
import { MessageSocket } from "store/services/api/messenger";
import { FriendType } from "store/services/api/messenger/messengerApi.types";
import { WS_EVENT_PATH } from "common/enums/enums";
import { useGetMessagesByUserQuery } from "store/services/api/messenger/messengerApi";
import s from "./chat.module.css";
import { ChatHeader } from "app/messenger/chat/chatHeader/chatHeader/chatHeader";
import { ChatMessage } from "app/messenger/chat/chatHeader/chatMessage/chatMessage";
import { ChatInput } from "app/messenger/chat/chatHeader/chatInput/chatInput";

type Props = {
  myUserId: number | null;
  selectedFriend: FriendType | null;
  socket: Socket | null;
  meData?: { userName?: string; avatars?: { url: string }[] };
  updateCacheWithMessageAction: (msg: MessageSocket) => void;
};

const MAX_MESSAGE_LENGTH = 500;

export const Chat = ({ myUserId, selectedFriend, socket, meData, updateCacheWithMessageAction }: Props) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messageText, setMessageText] = useState("");
  const prevFriendRef = useRef<number | null>(null);

  // Получаем сообщения из RTK Query
  const { data: messagesData, refetch } = useGetMessagesByUserQuery(
    { dialoguePartnerId: selectedFriend?.id ?? 0 },
    { skip: !selectedFriend }
  );

  // Автоскролл с учетом смены диалога
  useEffect(() => {
    if (!selectedFriend) return;

    if (prevFriendRef.current !== selectedFriend.id) {
      // Переключение на нового друга — сразу в самый низ без анимации
      messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
      prevFriendRef.current = selectedFriend.id;
    } else {
      // Новое сообщение — плавный скролл
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messagesData?.items, selectedFriend]);

  // Подписка на сокет
  useEffect(() => {
    if (!socket || !myUserId) return;

    const handleMessageUpdate = (message: MessageSocket) => {
      updateCacheWithMessageAction(message);

      if (message.receiverId === myUserId && message.status === "SENT") {
        socket.emit(WS_EVENT_PATH.MESSAGE_SEND, {
          message: message.messageText,
          receiverId: message.ownerId,
        });
      }
    };

    socket.on(WS_EVENT_PATH.RECEIVE_MESSAGE, handleMessageUpdate);
    socket.on(WS_EVENT_PATH.UPDATE_MESSAGE, handleMessageUpdate);

    return () => {
      socket.off(WS_EVENT_PATH.RECEIVE_MESSAGE, handleMessageUpdate);
      socket.off(WS_EVENT_PATH.UPDATE_MESSAGE, handleMessageUpdate);
    };
  }, [socket, myUserId, updateCacheWithMessageAction]);

  const handleSendMessage = () => {
    if (!socket || !selectedFriend || !messageText.trim() || !myUserId) return;

    const tempMessage: MessageSocket = {
      id: Date.now(),
      ownerId: myUserId,
      receiverId: selectedFriend.id,
      messageText,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messageType: "TEXT",
      status: "SENT",
      userName: meData?.userName ?? "Me",
      avatars:
        meData?.avatars?.map((a) => ({
          url: a.url,
          width: 50,
          height: 50,
          fileSize: 0,
          createdAt: new Date().toISOString(),
        })) ?? [],
    };

    socket.emit("receive-message", { message: messageText, receiverId: selectedFriend.id });
    updateCacheWithMessageAction(tempMessage);
    setMessageText("");

    // Обновляем данные через RTK Query после отправки
    refetch();
  };

  return (
    <div className={s.chat}>
      <ChatHeader selectedFriend={selectedFriend} />

      <div className={s.chatField}>
        {messagesData?.items?.map((m) => (
          <ChatMessage
            key={m.id}
            message={m}
            isMine={m.ownerId === myUserId}
            friendAvatarUrl={selectedFriend?.avatarUrl}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {selectedFriend && (
        <ChatInput
          messageText={messageText}
          setMessageTextAction={setMessageText}
          sendMessageAction={handleSendMessage}
          maxLength={MAX_MESSAGE_LENGTH}
        />
      )}
    </div>
  );
};
