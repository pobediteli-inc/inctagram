"use client";

import Image from "next/image";
import { Typography } from "common/components";
import { FriendType } from "store/services/api/messenger/messengerApi.types";
import s from "./chatHeader.module.css";

type Props = {
  selectedFriend: FriendType | null;
};

export const ChatHeader = ({ selectedFriend }: Props) => (
  <div className={s.friendName}>
    {selectedFriend?.avatarUrl && (
      <Image
        src={selectedFriend.avatarUrl}
        alt={selectedFriend.name}
        width={40}
        height={40}
        className={s.friendAvatar}
      />
    )}
    <Typography variant={"regular_16"}>{selectedFriend ? selectedFriend.name : "Select a friend to chat"}</Typography>
  </div>
);
