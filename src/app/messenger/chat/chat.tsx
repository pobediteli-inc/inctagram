// app/messenger/chat/chat.tsx
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";
import { WS_EVENT_PATH } from "common/enums/enums";
import { MessageSocket } from "store/services/api/messenger";
import { FriendType } from "store/services/api/messenger/messengerApi.types";
import { useGetMessagesByUserQuery, useUpdateMessageStatusMutation } from "store/services/api/messenger/messengerApi";
import { ChatHeader } from "app/messenger/chat/chatHeader/chatHeader/chatHeader";
import { ChatMessage } from "app/messenger/chat/chatHeader/chatMessage/chatMessage";
import { ChatInput } from "app/messenger/chat/chatHeader/chatInput/chatInput";
import s from "./chat.module.css";
import { useDispatch } from "react-redux";
import { handleErrors } from "common/utils";

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
  const prevFriendId = useRef<number | null>(null);
  const [updateMessageStatus] = useUpdateMessageStatusMutation();
  const dispatch = useDispatch();

  /** Сообщения диалога */
  const { data: messagesData, refetch } = useGetMessagesByUserQuery(
    { dialoguePartnerId: selectedFriend?.id ?? 0 },
    { skip: !selectedFriend }
  );

  /** Автоскролл при загрузке / смене собеседника */
  useEffect(() => {
    if (!selectedFriend) return;
    messagesEndRef.current?.scrollIntoView({
      behavior: prevFriendId.current === selectedFriend.id ? "smooth" : "auto",
    });
    prevFriendId.current = selectedFriend.id;
  }, [messagesData?.items, selectedFriend]);

  /** Проверка релевантности сообщения */
  const isRelevant = useCallback(
    (msg: MessageSocket) =>
      myUserId &&
      selectedFriend &&
      [msg.ownerId, msg.receiverId].includes(selectedFriend.id) &&
      [msg.ownerId, msg.receiverId].includes(myUserId),
    [selectedFriend, myUserId]
  );

  /** Обновление статуса сообщений при открытии чата */
  useEffect(() => {
    if (!selectedFriend || !myUserId || !messagesData?.items?.length) return;

    // Находим непрочитанные сообщения от собеседника
    const unreadMessages = messagesData.items.filter((msg) => msg.ownerId !== myUserId && msg.status === "SENT");

    if (unreadMessages.length > 0) {
      const unreadIds = unreadMessages.map((msg) => msg.id);

      // Обновляем статус через API
      updateMessageStatus({ ids: unreadIds }).catch((err) => handleErrors(err, dispatch));

      // Обновляем статус в кэше
      unreadMessages.forEach((msg) => {
        updateCacheWithMessageAction({
          ...msg,
          status: "READ",
        });
      });
    }
  }, [selectedFriend, myUserId, messagesData, updateMessageStatus, updateCacheWithMessageAction, dispatch]);

  /** Подписка на сокет */
  useEffect(() => {
    if (!socket || !myUserId || !selectedFriend) return;

    const handleReceive = (msg: MessageSocket) => {
      if (!isRelevant(msg)) return;
      updateCacheWithMessageAction(msg);

      // Если сообщение адресовано мне и имеет статус SENT - отмечаем как прочитанное
      if (msg.receiverId === myUserId && msg.status === "SENT") {
        // Обновляем статус через API
        updateMessageStatus({ ids: [msg.id] }).catch((err) => handleErrors(err, dispatch));

        // Отправляем подтверждение через сокет
        socket.emit(WS_EVENT_PATH.MESSAGE_SEND, {
          message: msg.messageText,
          receiverId: msg.ownerId,
        });

        // Обновляем статус в кэше
        updateCacheWithMessageAction({
          ...msg,
          status: "READ",
        });
      }
    };

    const handleAck = (data: { message: MessageSocket; receiverId: number }) => {
      if (data.receiverId === myUserId) {
        // Обновляем статус подтвержденного сообщения
        updateMessageStatus({ ids: [data.message.id] }).catch((err) => handleErrors(err, dispatch));
        updateCacheWithMessageAction({
          ...data.message,
          status: "READ",
        });
      }
    };

    socket.on(WS_EVENT_PATH.RECEIVE_MESSAGE, handleReceive);
    socket.on(WS_EVENT_PATH.MESSAGE_SEND, handleAck);
    socket.on(WS_EVENT_PATH.UPDATE_MESSAGE, handleReceive);

    return () => {
      socket.off(WS_EVENT_PATH.RECEIVE_MESSAGE, handleReceive);
      socket.off(WS_EVENT_PATH.MESSAGE_SEND, handleAck);
      socket.off(WS_EVENT_PATH.UPDATE_MESSAGE, handleReceive);
    };
  }, [socket, myUserId, selectedFriend, updateCacheWithMessageAction, isRelevant, updateMessageStatus, dispatch]);

  /** Отправка сообщения */
  const handleSendMessage = useCallback(() => {
    if (!socket || !selectedFriend || !messageText.trim() || !myUserId) return;

    const now = new Date().toISOString();
    const tempMessageId = Date.now();

    // Создаем временное сообщение со статусом SENT
    const tempMessage: MessageSocket = {
      id: tempMessageId,
      ownerId: myUserId,
      receiverId: selectedFriend.id,
      messageText,
      createdAt: now,
      updatedAt: now,
      messageType: "TEXT",
      status: "SENT",
      userName: meData?.userName ?? "Me",
      avatars:
        meData?.avatars?.map((a) => ({
          url: a.url,
          width: 50,
          height: 50,
          fileSize: 0,
          createdAt: now,
        })) ?? [],
    };

    // Добавляем в кэш
    updateCacheWithMessageAction(tempMessage);

    // Отправляем через сокет
    socket.emit(WS_EVENT_PATH.RECEIVE_MESSAGE, {
      message: messageText,
      receiverId: selectedFriend.id,
    });

    setMessageText("");
    refetch();
  }, [socket, selectedFriend, messageText, myUserId, meData, updateCacheWithMessageAction, refetch]);

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
