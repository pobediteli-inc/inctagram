"use client";

import Image from "next/image";
import { Typography } from "common/components";
import { useGetPublicUserProfileQuery } from "store/services/api/publicUser/publicUserApi";
import { MessageSocket } from "store/services/api/messenger";
import { FriendType } from "store/services/api/messenger/messengerApi.types";
import s from "./friendItem.module.css";

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
  const friendAvatar = friendProfile?.avatars?.[0]?.url ?? dialogue.avatars?.[0]?.url ?? "";

  const lastMessage = dialogue.messageText ?? "";
  const lastMessageTime = dialogue.createdAt
    ? new Date(dialogue.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : "";

  const handleClick = () => {
    onSelectFriendAction({
      id: friendId,
      name: friendName,
      avatarUrl: friendAvatar,
    });
  };

  return (
    <div className={`${s.friendItem} ${selectedFriendId === friendId ? s.selected : ""}`} onClick={handleClick}>
      <div className={s.avatar}>
        {friendAvatar && (
          <Image
            src={friendAvatar}
            alt={`${friendName} avatar`}
            className={s.avatarImg}
            width={48}
            height={48}
            priority={false}
          />
        )}
      </div>

      <div className={s.friendInfo}>
        <Typography variant="regular_14" className={s.friendNameText}>
          {friendName}
        </Typography>
        <Typography variant="small" className={s.lastMessageText}>
          {lastMessage}
        </Typography>
      </div>

      {lastMessageTime && (
        <Typography variant="small" className={s.messageTime}>
          {lastMessageTime}
        </Typography>
      )}
    </div>
  );
};
