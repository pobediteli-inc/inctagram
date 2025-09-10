"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Avatar, Scroll, TextField, Typography } from "common/components";
import { useDebounce } from "common/hooks/useDebounce";
import { useLazyGetUsersQuery, UserItem } from "store/services/api/users";
import s from "./page.module.css";
import { DEFAULT_PAGE_SIZE } from "common/constants/pagination";
import Link from "next/link";
import { ROUTES } from "common/constants/routes";
import { useMeQuery } from "store/services/api/auth";

export default function Search() {
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearch = useDebounce(searchValue, 500);

  const [trigger, { isFetching }] = useLazyGetUsersQuery();
  const [users, setUsers] = useState<UserItem[]>([]);
  const [cursor, setCursor] = useState<number | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const loadUsers = useCallback(
    async (search: string, cursorToUse: number | null) => {
      if (isLoading) return;
      setIsLoading(true);

      try {
        const result = await trigger({
          search,
          pageSize: DEFAULT_PAGE_SIZE,
          ...(cursorToUse != null ? { cursor: cursorToUse } : {}),
        });

        if ("data" in result) {
          const newUsers = result?.data?.items ?? [];
          const nextCursor = result?.data?.nextCursor ?? null;

          setUsers((prev) => {
            const merged = cursorToUse != null ? [...prev, ...newUsers] : newUsers;
            return Array.from(new Map(merged.map((u) => [u.id, u])).values());
          });

          setCursor(nextCursor);
          setHasMore(nextCursor != null);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [trigger]
  );

  useEffect(() => {
    const trimmed = debouncedSearch.trim();
    if (trimmed) {
      setCursor(null);
      setHasMore(true);
      setUsers([]);
      loadUsers(trimmed, null);
    } else {
      setUsers([]);
      setHasMore(false);
      setCursor(null);
    }
  }, [debouncedSearch, loadUsers]);

  useEffect(() => {
    if (!sentinelRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasMore && !isLoading && cursor != null) {
          loadUsers(debouncedSearch, cursor);
        }
      },
      { root: document.querySelector(`.${s.results}`), rootMargin: "0px", threshold: 1.0 }
    );

    observer.observe(sentinelRef.current);

    return () => {
      observer.disconnect();
    };

    
  const ownerId = useMeQuery().data?.userId;

  return (
    <section className={s.search}>
      <Typography variant="h1" className={s.header}>
        Search
      </Typography>

      <TextField
        type="search"
        className={s.searchInput}
        inputChangeHandler={setSearchValue}
        value={searchValue}
        placeholder="Search users..."
      />


      <Scroll className={s.results} viewportClassName={s.results}>
        {users?.map((user) => {
          const isMe = ownerId === user.id;
          const href = isMe ? ROUTES.myProfile(ownerId) : ROUTES.userProfile(user.userName);

          return (
          <div key={user.id} className={s.userCard}>
            <Avatar size="medium" src={user?.avatars?.[0]?.url} />
            <div className={s.userInfo}>
              <Link href={ROUTES.userProfile(user.userName)} className={s.userLink}>
                <Typography variant="bold_14" className={s.userName}>
                  {user.userName}
                </Typography>
              </div>
            </div>
          );
        })}

        {(isFetching || isLoading) && <Typography>Loading...</Typography>}
        {!isFetching && !isLoading && users?.length === 0 && <Typography>No users found.</Typography>}

        <div ref={sentinelRef} style={{ height: 1 }} />
      </Scroll>
    </section>
  );
}
