"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLazyGetFollowedPublicationsQuery } from "store/services/api/feed";
import { DEFAULT_PAGE_SIZE } from "common/constants/pagination";
import { Avatar, Carousel, CommentForm, Separator, Typography } from "common/components";
import { timeAgo } from "common/utils/timeAgo";
import s from "./feed.module.css";
import { PostComments } from "common/components/post/postComments/postComments";
import { PostInteractions } from "app/publicUser/[profileId]/postInteractions/postInteractions";
import { PostDescription } from "common/components/post/postDescription/postDescription";
import { useHandleAddComment } from "common/hooks";
import { PostData } from "store/services/api/posts";

export default function Feed() {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const loaderRef = useRef<HTMLDivElement | null>(null);

  // refs to avoid changing fetchPosts identity when state changes
  const isLoadingRef = useRef(isLoading);
  const hasMoreRef = useRef(hasMore);
  const pageRef = useRef(pageNumber);

  useEffect(() => {
    isLoadingRef.current = isLoading;
  }, [isLoading]);
  useEffect(() => {
    hasMoreRef.current = hasMore;
  }, [hasMore]);
  useEffect(() => {
    pageRef.current = pageNumber;
  }, [pageNumber]);

  const [trigger] = useLazyGetFollowedPublicationsQuery();
  const handleAddCommentAction = useHandleAddComment();

  // stable fetchPosts (depends only on trigger)
  const fetchPosts = useCallback(
    async (page: number) => {
      if (isLoadingRef.current) return;
      if (!hasMoreRef.current) return;

      // guard
      isLoadingRef.current = true;
      setIsLoading(true);

      try {
        const res = await trigger({
          pageSize: DEFAULT_PAGE_SIZE,
          pageNumber: page,
        }).unwrap();

        if (res?.items?.length) {
          setPosts((prev) => {
            const existingIds = new Set(prev.map((p) => p.id));
            const newPosts = res.items.filter((p) => !existingIds.has(p.id));
            return [...prev, ...newPosts];
          });

          const more = res.items.length === DEFAULT_PAGE_SIZE;
          setHasMore(more);
          hasMoreRef.current = more;

          // increment page number (and pageRef)
          setPageNumber((prev) => {
            const next = prev + 1;
            pageRef.current = next;
            return next;
          });
        } else {
          setHasMore(false);
          hasMoreRef.current = false;
        }
      } catch (err) {
        console.error("Ошибка загрузки постов:", err);
      } finally {
        isLoadingRef.current = false;
        setIsLoading(false);
      }
    },
    [trigger]
  );

  // initial load — run once
  useEffect(() => {
    fetchPosts(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // intentionally empty — fetchPosts is stable

  // IntersectionObserver — attaches once; uses refs inside callback
  useEffect(() => {
    const loader = loaderRef.current;
    if (!loader) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          // use refs for current state
          if (!isLoadingRef.current && hasMoreRef.current) {
            // fetch the current page (pageRef.current)
            fetchPosts(pageRef.current);
          }
        }
      },
      { rootMargin: "300px", threshold: 0.1 }
    );

    observer.observe(loader);
    return () => observer.disconnect();
  }, [fetchPosts]);

  return (
    <div className={s.feed}>
      {posts.map((post) => {
        const imageUrls = post.images.map((image) => image.url);

        return (
          <div key={post.id} className={s.postWrapper}>
            <div className={s.postData}>
              <Avatar size="small" src={post.avatarOwner} className={s.avatar} />
              <Typography variant="h3" className={s.userName}>
                {post.userName}
              </Typography>
              <Typography variant="small" color="dark">
                {timeAgo(post.createdAt)}
              </Typography>
            </div>
            <Carousel slides={imageUrls} />
            <PostInteractions posts={post} />
            {post.description && <PostDescription post={post} />}
            <PostComments post={post} isHidden />
            <CommentForm postId={post.id} onCommentSubmitAction={handleAddCommentAction} className={s.commentForm} />
            <Separator />
          </div>
        );
      })}

      {hasMore && (
        <div
          ref={loaderRef}
          style={{
            height: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {isLoading && <span>Loading more...</span>}
        </div>
      )}
    </div>
  );
}
