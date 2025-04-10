"use client";

import s from "./page.module.css";
import Image from "next/image";
import { useGetProfileByUserNameQuery } from "store/services/api/profile/profileApi";
import { useGetPostsByUserNameQuery } from "store/services/api/posts/postsApi";
import { useEffect, useState } from "react";
import { Post } from "store/services/api/posts/postsApi.types";
import { Button, Typography } from "common/components";
import { debounce } from "next/dist/server/utils";
import { useMeQuery } from "store/services/api/auth";
import { MyPost } from "app/my-profile/myPost/myPost";
import Link from "next/link";

export default function MyProfile() {
  const [pageNumber, setPageNumber] = useState(1);
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [postIsOpen, setPostIsOpen] = useState(false);

  const { data: meData } = useMeQuery();
  const { data } = useGetProfileByUserNameQuery({ userName: meData?.userName as string });

  const { data: postsWithMeta, isFetching } = useGetPostsByUserNameQuery({
    userName: meData?.userName as string,
    pageSize: 8,
    pageNumber,
  });

  useEffect(() => {
    if (postsWithMeta?.items && !isFetching) {
      setAllPosts((prevPosts) => [...prevPosts, ...postsWithMeta.items]);
    }
  }, [postsWithMeta, isFetching]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 50) {
        if (!isFetching) {
          setPageNumber((prevPage) => prevPage + 1);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFetching]);

  useEffect(() => {
    const handleWheel = debounce((event: WheelEvent) => {
      if (event.deltaY > 0) {
        if (!isFetching) {
          setPageNumber((prevPage) => prevPage + 1);
        }
      }
    }, 300);

    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, [isFetching]);

  return (
    <main className={s.main}>
      <section className={s.profileSection}>
        <div className={s.avatarWrapper}>
          <Image
            src={data?.avatars[0]?.url ?? "/icons/svg/person.svg"}
            alt="Profile Picture"
            layout="fill"
            objectFit="cover"
            className={s.avatar}
          />
        </div>

        <div>
          <div className={s.top}>
            <Typography variant={"h1"}>{data?.userName}</Typography>
            <div className={s.actionButtons}>
              <Button variant={"secondary"}>Profile Settings</Button>
            </div>
          </div>

          <div>
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
        {allPosts.length > 0 ? (
          allPosts.map((post) => (
            <div key={`${post.id}`} className={s.imageWrapper}>
              <MyPost post={post} isOpen={postIsOpen} setIsOpen={setPostIsOpen} />
              <Image
                src={post.images[0]?.url ?? "/icons/svg/person.svg"}
                alt={`Image of post ${post.id}`}
                width={post.images[0]?.width || 234}
                height={post.images[0]?.height || 228}
                className={s.image}
                loading="lazy"
                onClick={() => setPostIsOpen(true)}
              />
            </div>
          ))
        ) : (
          <Typography variant={"regular_16"}>Loading photos...</Typography>
        )}
      </section>
    </main>
  );
}
