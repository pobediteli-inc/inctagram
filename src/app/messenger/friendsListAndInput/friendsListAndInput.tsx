"use client";

import { TextField } from "common/components";
import { FriendItem } from "app/messenger/friendItem/friendItem";
import { MessageSocket } from "store/services/api/messenger";
import { FriendType } from "store/services/api/messenger/messengerApi.types";
import s from "./friendsListAndInput.module.css";

type Props = {
  dialogues?: MessageSocket[];
  myUserId: number | null;
  selectedFriendId: number | null;
  searchText: string;
  setSearchTextAction: (value: string) => void;
  onSelectFriendAction: (friend: FriendType) => void;
};

export const FriendsListAndInput = ({
  dialogues,
  myUserId,
  selectedFriendId,
  searchText,
  setSearchTextAction,
  onSelectFriendAction,
}: Props) => {
  // Фильтруем по поиску и сортируем по дате последнего сообщения
  const filteredDialogues = dialogues
    ?.filter((d) => d.userName?.toLowerCase().includes(searchText.toLowerCase()))
    ?.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className={s.friendsList}>
      <div className={s.inputSearchWrapper}>
        <TextField
          type="search"
          value={searchText}
          inputChangeHandler={setSearchTextAction}
          placeholder="Search friends..."
          className={s.inputSearchFriend}
        />
      </div>

      {filteredDialogues?.map((d) => (
        <FriendItem
          key={`${d.id}-${d.receiverId}-${d.ownerId}`}
          dialogue={d}
          myUserId={myUserId}
          selectedFriendId={selectedFriendId}
          onSelectFriendAction={onSelectFriendAction}
        />
      ))}
    </div>
  );
};
