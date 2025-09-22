"use client";

import { useCallback, useEffect, useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Typography } from "common/components";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { useSocket } from "common/hooks/useSocket";
import { MessageSocket, messengerApi } from "store/services/api/messenger";
import { authApi } from "store/services/api/auth";
import { selectIsLoggedIn } from "store/services/slices";
import { store } from "store/store";
import { FriendsListAndInput } from "app/messenger/friendsListAndInput/friendsListAndInput";
import { Chat } from "app/messenger/chat/chat";
import { sortMessages } from "common/utils";
import { FriendType } from "store/services/api/messenger/messengerApi.types";
import s from "./page.module.css";

export default function Messenger() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const searchParams = useSearchParams();
  const userIdFromQuery = Number(searchParams?.get("userId"));

  const { data: meData } = authApi.useMeQuery();
  const myUserId = meData?.userId ?? null;

  const [selectedFriend, setSelectedFriend] = useState<FriendType | null>(null);
  const [searchText, setSearchText] = useState("");

  const { data: dialoguesData } = messengerApi.useGetMessagesQuery({}, { skip: !isLoggedIn });
  const { data: messagesData } = messengerApi.useGetMessagesByUserQuery(
    { dialoguePartnerId: selectedFriend?.id ?? 0 },
    { skip: !selectedFriend?.id }
  );

  const socket = useSocket({ isLoggedIn, myUserId });

  const updateCacheWithMessageAction = useCallback(
    (msg: MessageSocket) => {
      if (!myUserId) return;

      const friendId = msg.receiverId === myUserId ? msg.ownerId : msg.receiverId;
      const cache = messengerApi.endpoints.getMessagesByUser.select({ dialoguePartnerId: friendId })(store.getState());

      if (cache?.data) {
        dispatch(
          messengerApi.util.updateQueryData("getMessagesByUser", { dialoguePartnerId: friendId }, (draft) => {
            if (!draft.items.find((m) => m.id === msg.id)) {
              draft.items.push(msg);
              sortMessages(draft.items);
              draft.totalCount += 1;
              draft.notReadCount += msg.ownerId !== myUserId ? 1 : 0;
            }
          })
        );
      } else {
        dispatch(
          messengerApi.util.upsertQueryData(
            "getMessagesByUser",
            { dialoguePartnerId: friendId },
            {
              totalCount: 1,
              pageSize: 12,
              notReadCount: msg.ownerId !== myUserId ? 1 : 0,
              items: [msg],
            }
          )
        );
      }

      dispatch(messengerApi.util.invalidateTags(["Messenger"]));
    },
    [dispatch, myUserId]
  );

  // Установка друга из URL
  useEffect(() => {
    if (!myUserId || !isLoggedIn || !userIdFromQuery || !dialoguesData?.items?.length) return;

    const dialogue = dialoguesData.items.find(
      (d) =>
        (d.ownerId === userIdFromQuery && d.receiverId === myUserId) ||
        (d.receiverId === userIdFromQuery && d.ownerId === myUserId)
    );

    if (!dialogue) return;

    setSelectedFriend({
      id: userIdFromQuery,
      name: dialogue.userName || "Unknown",
      avatarUrl: dialogue.avatars?.[0]?.url,
    });
  }, [myUserId, isLoggedIn, userIdFromQuery, dialoguesData]);

  const selectFriend = (friend: FriendType) => {
    router.push(`/messenger?userId=${friend.id}`);
    setSelectedFriend(friend);
  };

  const uniqueDialogues = useMemo(() => {
    if (!dialoguesData?.items?.length) return [];
    const map = new Map<string, (typeof dialoguesData.items)[0]>();
    dialoguesData.items.forEach((d) => {
      const key = [d.ownerId, d.receiverId].sort().join("-");
      if (!map.has(key)) map.set(key, d);
    });
    return Array.from(map.values());
  }, [dialoguesData?.items]);

  return (
    <div className={s.wrapper}>
      <Typography variant="h1">Messenger</Typography>
      <div className={s.friendsListAndChat}>
        <FriendsListAndInput
          dialogues={uniqueDialogues}
          myUserId={myUserId}
          selectedFriendId={selectedFriend?.id ?? null}
          searchText={searchText}
          setSearchTextAction={setSearchText}
          onSelectFriendAction={selectFriend}
        />
        <Chat
          myUserId={myUserId}
          selectedFriend={selectedFriend}
          messagesData={messagesData}
          meData={meData}
          socket={socket}
          updateCacheWithMessageAction={updateCacheWithMessageAction}
        />
      </div>
    </div>
  );
}
