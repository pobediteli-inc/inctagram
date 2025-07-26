"use client";

import { useGetFollowedPublicationsQuery } from "store/services/api/feed";
import { DEFAULT_CURSOR_ID, DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from "common/constants/pagination";

export default function Feed() {
  const { data } = useGetFollowedPublicationsQuery({
    pageSize: DEFAULT_PAGE_SIZE,
    pageNumber: DEFAULT_PAGE_NUMBER,
    endCursorPostId: DEFAULT_CURSOR_ID,
  });
  return <div>{data?.items.map((p) => JSON.stringify(p))}</div>;
}
