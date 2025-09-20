"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { TextField, Typography, Button } from "common/components";
import { MessageSocket } from "store/services/api/messenger";
import s from "./chat.module.css";
import { FriendType } from "store/services/api/messenger/messengerApi.types";
import { Socket } from "socket.io-client";

type Props = {
  myUserId: number | null;
  selectedFriend: FriendType | null;
  messagesData?: { items: MessageSocket[] };
  meData?: { userName?: string; avatars?: { url: string }[] };
  socket: Socket | null;
  updateCacheWithMessageAction: (msg: MessageSocket) => void;
};

export const Chat = ({
  myUserId,
  selectedFriend,
  messagesData,
  meData,
  socket,
  updateCacheWithMessageAction,
}: Props) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messageText, setMessageText] = useState("");

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messagesData]);

  const handleSendMessage = () => {
    if (!socket || !selectedFriend || !messageText.trim() || !myUserId) return;

    const payload = { message: messageText, receiverId: selectedFriend.id };
    socket.emit("receive-message", payload, (response: { error?: string }) => {
      if (response?.error) console.error("Error sending message:", response.error);
    });

    // Временное сообщение
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

    updateCacheWithMessageAction(tempMessage);
    setMessageText("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const canSend = Boolean(selectedFriend && messageText.trim());

  return (
    <div className={s.chat}>
      <div className={s.friendName}>
        {selectedFriend ? (
          <Typography variant="h3">{selectedFriend.name}</Typography>
        ) : (
          <Typography>Select a friend to chat</Typography>
        )}
      </div>

      <div className={s.chatField}>
        {messagesData?.items?.map((m) => (
          <div key={m.id} className={m.ownerId === myUserId ? s.myMessage : s.friendMessage}>
            <div className={s.messageContent}>
              <Typography>{m.messageText}</Typography>
              <time>
                {new Date(m.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </time>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {selectedFriend && (
        <div className={s.typeMessage}>
          <TextField
            value={messageText}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setMessageText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className={s.textareaMessage}
          />
          {canSend && (
            <Button onClick={handleSendMessage} disabled={!canSend} variant={"link"}>
              Send message
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
