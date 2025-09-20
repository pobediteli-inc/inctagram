"use client";

import Image from "next/image";
import { MessageSocket } from "store/services/api/messenger";
import s from "./friendItem.module.css";
import { useGetPublicUserProfileQuery } from "store/services/api/publicUser/publicUserApi";
import { FriendType } from "store/services/api/messenger/messengerApi.types";

type Props = {
  dialogue: MessageSocket;
  myUserId: number | null;
  selectedFriendId: number | null;
  onSelectFriendAction: (friend: FriendType) => void;
};

export const FriendItem = ({ dialogue, myUserId, selectedFriendId, onSelectFriendAction }: Props) => {
  const friendId = dialogue.ownerId === myUserId ? dialogue.receiverId : dialogue.ownerId;

  const { data: friendProfile } = useGetPublicUserProfileQuery({ profileId: friendId });

  const friendName = friendProfile?.userName ?? dialogue.userName ?? "Unknown";
  const friendAvatar = friendProfile?.avatars?.[0]?.url ?? dialogue.avatars?.[0]?.url;

  const lastMessage = dialogue.messageText;
  const lastMessageTime = dialogue.createdAt
    ? new Date(dialogue.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : "";

  // Передаем объект FriendType
  const handleClick = () => {
    onSelectFriendAction({
      id: friendId,
      name: friendName,
      avatarUrl: friendAvatar,
    });
  };

  return (
    <div className={`${s.friendItem} ${selectedFriendId === friendId ? s.selected : ""}`} onClick={handleClick}>
      <div className={`${s.avatar} ${friendAvatar ? "online" : ""}`}>
        {friendAvatar && (
          <Image
            src={friendAvatar}
            alt={`${friendName} avatar`}
            className={s.avatarImg}
            width={50}
            height={50}
            priority={false}
          />
        )}
      </div>
      <div className={s.friendInfo}>
        <p className={s.friendNameText}>{friendName}</p>
        <p className={s.lastMessageText}>{lastMessage}</p>
      </div>
      <div className={s.messageTime}>{lastMessageTime}</div>
    </div>
  );
};
