"use client";

import { useGetFollowedPublicationsQuery } from "store/services/api/feed";

export default function Feed() {
  const { data } = useGetFollowedPublicationsQuery({ pageSize: 10, pageNumber: 1, endCursorPostId: 0 });
  return <div>{data?.items.map((p) => JSON.stringify(p))}</div>;
}
