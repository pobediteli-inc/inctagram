"use client";

import s from "./profile.module.css";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Avatar, Button, Typography } from "common/components";
import Link from "next/link";
import { PostData } from "store/services/api/posts";
import { ROUTES } from "common/constants/routes";
import { useGetPostsByUserNameQuery } from "store/services/api/posts/postsApi";
import { Post } from "common/components/post/post";
import { UserByUserName } from "store/services/api/profile";

type Props = {
  isCurrentUser?: boolean;
  profileData: UserByUserName;
  follow?: () => void;
  unfollow?: () => void;
};

export default function Profile({ isCurrentUser = false, profileData, follow, unfollow }: Props) {
  const [page, setPage] = useState(1);
  const observerRef = useRef<HTMLDivElement>(null);
  const [posts, setPosts] = useState<PostData[]>([]);
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

  const { data: postsWithMeta, isFetching } = useGetPostsByUserNameQuery({
    userName: profileData.userName,
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
          <Avatar src={profileData?.avatars[0]?.url} size={"large"} className={s.avatar} />
        </div>

        <div>
          <div className={s.top}>
            <Typography variant={"h1"}>{profileData?.userName}</Typography>
            {isCurrentUser ? (
              <div className={s.actionButtons}>
                <Button variant={"secondary"} asChild>
                  <Link href={ROUTES.settings}>Profile Settings</Link>
                </Button>
              </div>
            ) : !profileData.isFollowing ? (
              <div className={s.actionButtons}>
                <Button variant={"primary"} onClick={follow}>
                  Follow
                </Button>
              </div>
            ) : (
              <div className={s.actionButtons}>
                <Button variant={"outlined"} onClick={unfollow}>
                  Unfollow
                </Button>
              </div>
            )}
          </div>

          <div className={s.profileInfo}>
            <div className={s.stats}>
              <div>
                <Typography variant={"bold_14"}>{profileData?.followingCount}</Typography>
                <Typography variant={"regular_14"}>Following</Typography>
              </div>
              <div>
                <Typography variant={"bold_14"}>{profileData?.followersCount}</Typography>
                <Typography variant={"regular_14"}>Followers</Typography>
              </div>
              <div>
                <Typography variant={"bold_14"}>{profileData?.publicationsCount}</Typography>
                <Typography variant={"regular_14"}>Publications</Typography>
              </div>
            </div>
            <Typography variant={"regular_16"} color={"light"} className={s.description}>
              {profileData?.aboutMe ??
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
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
              <Post
                post={post}
                isOpen={openPostId === post.id}
                handleCloseAction={() => setOpenPostId(null)}
                handleDeleteAction={handleDelete}
                handleUpdateAction={handleUpdate}
                isEditable={isCurrentUser}
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
          <Typography variant={"regular_16"}>This user doesn&#39;t have publications.</Typography>
        )}
        {hasMore && <div ref={observerRef} style={{ height: "1px" }} />}
      </section>
    </main>
  );
}
