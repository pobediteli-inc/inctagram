"use client";

import { useCallback, useEffect, useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { useSocket } from "common/hooks/useSocket";
import { sortMessages } from "common/utils";
import { Typography } from "common/components";
import { FriendsListAndInput } from "app/messenger/friendsListAndInput/friendsListAndInput";
import { Chat } from "app/messenger/chat/chat";
import { store } from "store/store";
import { selectIsLoggedIn } from "store/services/slices";
import { authApi } from "store/services/api/auth";
import { messengerApi, MessageSocket } from "store/services/api/messenger";
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
  const socket = useSocket({ isLoggedIn, myUserId });

  /** Обновляем кэш при приходе нового сообщения */
  const updateCacheWithMessageAction = useCallback(
    (msg?: MessageSocket) => {
      if (!msg || !myUserId) return;

      const { receiverId, ownerId, id } = msg;
      if (!receiverId || !ownerId || !id) return;

      const friendId = receiverId === myUserId ? ownerId : receiverId;
      const cache = messengerApi.endpoints.getMessagesByUser.select({ dialoguePartnerId: friendId })(store.getState());

      if (cache?.data) {
        dispatch(
          messengerApi.util.updateQueryData("getMessagesByUser", { dialoguePartnerId: friendId }, (draft) => {
            const existingIndex = draft.items.findIndex((m) => m.id === id);
            if (existingIndex !== -1) {
              // Обновляем существующее сообщение
              draft.items[existingIndex] = msg;
            } else {
              // Добавляем новое сообщение
              draft.items.push(msg);
            }
            sortMessages(draft.items);
            draft.totalCount = draft.items.length;
            draft.notReadCount = draft.items.filter((m) => m.ownerId !== myUserId && m.status !== "READ").length;
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
              notReadCount: ownerId !== myUserId && msg.status !== "READ" ? 1 : 0,
              items: [msg],
            }
          )
        );
      }

      dispatch(messengerApi.util.invalidateTags(["Messenger"]));
    },
    [dispatch, myUserId]
  );

  /** Устанавливаем выбранного друга по userId из URL */
  useEffect(() => {
    if (!myUserId || !isLoggedIn || !userIdFromQuery) return;

    const dialogue = dialoguesData?.items?.find(
      (d) =>
        (d.ownerId === userIdFromQuery && d.receiverId === myUserId) ||
        (d.receiverId === userIdFromQuery && d.ownerId === myUserId)
    );

    if (dialogue) {
      setSelectedFriend({
        id: userIdFromQuery,
        name: dialogue.userName ?? "Unknown",
        avatarUrl: dialogue.avatars?.[0]?.url,
      });
    }
  }, [myUserId, isLoggedIn, userIdFromQuery, dialoguesData]);

  /** Убираем дубликаты диалогов */
  const uniqueDialogues = useMemo(() => {
    if (!dialoguesData?.items) return [];
    const map = new Map<string, (typeof dialoguesData.items)[number]>();
    dialoguesData.items.forEach((d) => {
      const key = [d.ownerId, d.receiverId].sort().join("-");
      if (!map.has(key)) map.set(key, d);
    });
    return [...map.values()];
  }, [dialoguesData]);

  const selectFriend = useCallback(
    (friend: FriendType) => {
      router.push(`/messenger?userId=${friend.id}`);
      setSelectedFriend(friend);
    },
    [router]
  );

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
          meData={meData}
          socket={socket}
          updateCacheWithMessageAction={updateCacheWithMessageAction}
        />
      </div>
    </div>
  );
}
