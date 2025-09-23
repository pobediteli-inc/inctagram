"use client";

import Image from "next/image";
import { Typography } from "common/components";
import { MessageSocket } from "store/services/api/messenger";
import s from "./chatMessage.module.css";

type Props = {
  message: MessageSocket;
  isMine: boolean;
  friendAvatarUrl?: string;
};

export const ChatMessage = ({ message, isMine, friendAvatarUrl }: Props) => (
  <div className={isMine ? s.myMessage : s.friendMessage}>
    {!isMine && friendAvatarUrl && (
      <Image src={friendAvatarUrl} alt="Friend avatar" width={32} height={32} className={s.messageAvatar} />
    )}
    <div className={s.messageContent}>
      <Typography variant={"regular_14"}>{message.messageText}</Typography>
      <Typography variant={"small"} className={s.messageMeta}>
        <time>{new Date(message.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</time>
        {isMine && <Typography variant={"small"}>{message.status.toLowerCase()}</Typography>}
      </Typography>
    </div>
  </div>
);
