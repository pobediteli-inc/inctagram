"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { Avatar, Scroll, TextField, Typography } from "common/components";
import { useDebounce } from "common/hooks/useDebounce";
import { useLazyGetUsersQuery, UserItem } from "store/services/api/users";
import s from "./page.module.css";
import { DEFAULT_CURSOR_ID, DEFAULT_PAGE_SIZE } from "common/constants/pagination";
import Link from "next/link";
import { ROUTES } from "common/constants/routes";
import { useMeQuery } from "store/services/api/auth";

export default function Search() {
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearch = useDebounce(searchValue, 500);

  const [trigger, { isFetching }] = useLazyGetUsersQuery();
  const [users, setUsers] = useState<UserItem[]>([]);

  const [cursor, setCursor] = useState<number | null>(0);
  const [hasMore, setHasMore] = useState(true);

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadUsers = useCallback(
    async (search: string, cursorToUse?: number) => {
      if (isLoading) return;
      setIsLoading(true);

      try {
        const result = await trigger({
          search,
          pageSize: DEFAULT_PAGE_SIZE,
          cursor: cursorToUse ?? DEFAULT_CURSOR_ID,
        });

        if ("data" in result) {
          const newUsers = result?.data?.items ?? [];
          const nextCursor = result?.data?.nextCursor ?? null;

          setUsers((prev) => (cursorToUse ? [...prev, ...newUsers] : newUsers));

          setCursor(nextCursor);
          setHasMore(Boolean(nextCursor));
        }
      } finally {
        setIsLoading(false);
      }
    },
    [trigger]
  );

  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container || isLoading || !hasMore) return;

    const threshold = 150;
    const bottomReached = container.scrollHeight - container.scrollTop - container.clientHeight < threshold;

    if (bottomReached && cursor !== null) {
      loadUsers(debouncedSearch, cursor);
    }
  }, [cursor, debouncedSearch, hasMore, loadUsers, isLoading]);

  useEffect(() => {
    const trimmed = debouncedSearch.trim();
    if (trimmed) {
      loadUsers(trimmed, 0);
    } else {
      setUsers([]);
      setHasMore(false);
      setCursor(null);
    }
  }, [debouncedSearch, loadUsers]);

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

      <Scroll onScroll={handleScroll} ref={scrollContainerRef} className={s.results} viewportClassName={s.results}>
        {users?.map((user) => {
          const isMe = ownerId === user.id;
          const href = isMe ? ROUTES.myProfile(ownerId) : ROUTES.userProfile(user.userName);

          return (
            <div key={user.id} className={s.userCard}>
              <Avatar size="medium" src={user?.avatars?.[0]?.url} />
              <div className={s.userInfo}>
                <Link href={href} className={s.userLink}>
                  <Typography variant="bold_14" className={s.userName}>
                    {user.userName}
                  </Typography>
                </Link>
                <Typography variant="regular_14" color="dark">
                  {user.firstName} {user.lastName}
                </Typography>
              </div>
            </div>
          );
        })}

        {isFetching && <Typography>Loading...</Typography>}

        {!isFetching && users?.length === 0 && <Typography>No users found.</Typography>}
      </Scroll>
    </section>
  );
}
