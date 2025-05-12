"use client";

import s from "./page.module.css";
import Image from "next/image";
import { useGetProfileByUserNameQuery } from "store/services/api/profile/profileApi";
import { useGetPostsByUserNameQuery } from "store/services/api/posts/postsApi";
import { useEffect, useRef, useState } from "react";
import { Avatar, Button, Typography } from "common/components";
import { useMeQuery } from "store/services/api/auth";
import { MyPost } from "app/my-profile/myPost/myPost";
import Link from "next/link";
import { Post } from "store/services/api/posts";

export default function MyProfile() {
  const [page, setPage] = useState(1);
  const observerRef = useRef<HTMLDivElement>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const pageSize = 8;

  useEffect(() => {
    if (page === 1) {
      setPosts([]);
    }
  }, [page]);

  const [openPostId, setOpenPostId] = useState<number | null>(null);

  const handlePostOpen = (postId: number) => {
    setOpenPostId(postId);
  };

  const { data: meData } = useMeQuery();
  const { data } = useGetProfileByUserNameQuery({ userName: meData?.userName as string });

  const { data: postsWithMeta, isFetching } = useGetPostsByUserNameQuery({
    userName: meData?.userName as string,
    pageSize,
    pageNumber: page,
  });

  useEffect(() => {
    if (postsWithMeta?.items) {
      setPosts((prevPosts) => {
        const newPosts = postsWithMeta.items;
        const updatedPosts = prevPosts.filter((post) => !newPosts.some((newPost) => newPost.id === post.id));
        return [...updatedPosts, ...newPosts];
      });
    }
  }, [postsWithMeta]);

  const totalCount = postsWithMeta?.totalCount ?? 0;
  const hasMore = posts.length < totalCount;

  useEffect(() => {
    const target = observerRef.current;
    if (!target || !hasMore || isFetching) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetching) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [hasMore, isFetching]);

  const handleDelete = (postId: number) => {
    setPosts((prevState) => prevState.filter((post) => post.id !== postId));
  };

  const handleUpdate = (postId: number, description: string) => {
    setPosts((prevPosts) => {
      return prevPosts.map((post) => (post.id === postId ? { ...post, description } : post));
    });
  };

  return (
    <main className={s.main}>
      <section className={s.profileSection}>
        <div className={s.avatarWrapper}>
          <Avatar src={data?.avatars[0]?.url} size={"large"} className={s.avatar} />
        </div>

        <div>
          <div className={s.top}>
            <Typography variant={"h1"}>{data?.userName}</Typography>
            <div className={s.actionButtons}>
              <Button variant={"secondary"} asChild>
                <Link href={"/settings"}>Profile Settings</Link>
              </Button>
            </div>
          </div>

          <div className={s.profileInfo}>
            <div className={s.stats}>
              <div>
                <Typography variant={"bold_14"}>{data?.followingCount}</Typography>
                <Typography variant={"regular_14"}>Following</Typography>
              </div>
              <div>
                <Typography variant={"bold_14"}>{data?.followersCount}</Typography>
                <Typography variant={"regular_14"}>Followers</Typography>
              </div>
              <div>
                <Typography variant={"bold_14"}>{data?.publicationsCount}</Typography>
                <Typography variant={"regular_14"}>Publications</Typography>
              </div>
            </div>
            <Typography variant={"regular_16"} color={"light"}>
              {data?.aboutMe ??
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et " +
                  "dolore magna aliqua."}
              <Link href="#" className={s.link}>
                {" "}
                More
              </Link>
            </Typography>
          </div>
        </div>
      </section>

      <section className={s.gallery}>
        {posts.length ? (
          posts.map((post) => (
            <div key={`${post.id}`} className={s.imageWrapper}>
              <MyPost
                post={post}
                isOpen={openPostId === post.id}
                handleClose={() => setOpenPostId(null)}
                handleDelete={handleDelete}
                handleUpdate={handleUpdate}
              />
              <Image
                src={post.images[0]?.url ?? "/icons/svg/person.svg"}
                alt={`Image of post ${post.id}`}
                width={post.images[0]?.width || 234}
                height={post.images[0]?.height || 228}
                className={s.image}
                loading="lazy"
                onClick={() => handlePostOpen(post.id)}
              />
            </div>
          ))
        ) : (
          <Typography variant={"regular_16"}>You don&#39;t have publications.</Typography>
        )}
        {hasMore && <div ref={observerRef} style={{ height: "1px" }} />}
      </section>
    </main>
  );
}
