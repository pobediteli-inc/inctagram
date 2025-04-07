"use client";

import s from "./page.module.css";
import Image from "next/image";
import { useGetProfileByUserNameQuery } from "store/services/profile/profileApi";
import { useGetPostsByUserNameQuery } from "store/services/posts/postsApi";
import { useEffect, useState } from "react";
import { Post } from "store/services/posts/postsApi.types";
import { Button, Typography } from "common/components";

export default function MyProfile() {
  const [page, setPage] = useState(1);
  const [allPosts, setAllPosts] = useState<Post[]>([]);

  const { data } = useGetProfileByUserNameQuery({ userName: "Irina124" });
  console.log("data: ", data);

  const {
    data: postsWithMeta,
    isFetching,
    isLoading,
  } = useGetPostsByUserNameQuery({ userName: "Irina124", pageSize: 8, pageNumber: page });
  console.log("PostsWithMeta", postsWithMeta);

  const posts = postsWithMeta?.items;

  useEffect(() => {
    if (postsWithMeta?.items && !isFetching) {
      setAllPosts((prevPosts) => [...prevPosts, ...postsWithMeta.items]);
    }
  }, [postsWithMeta, isFetching]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 50 // Буфер в 50px
      ) {
        /*setPage((prevPage) => prevPage + 1); // Увеличиваем номер страницы*/
        if (!isFetching) {
          setPage((prevPage) => prevPage + 1); // Увеличиваем номер страницы
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); // Очистка при размонтировании
  }, [isFetching]);

  if (!posts) {
    return <p>Loading photos...</p>;
  }

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
                <Typography variant={"bold_14"}>{data?.followingCount}</Typography> Following
              </div>
              <div>
                <Typography variant={"bold_14"}>{data?.followersCount}</Typography> Followers
              </div>
              <div>
                <Typography variant={"bold_14"}>{data?.publicationsCount}</Typography> Publications
              </div>
            </div>
            <p className={s.bio}>
              {data?.aboutMe ??
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et " +
                  "dolore magna aliqua."}
              <a href="#" className={s.link}>
                {" "}
                More
              </a>
            </p>
          </div>
        </div>
      </section>

      <section className={s.gallery}>
        {allPosts.length > 0 ? (
          allPosts.map((post) => (
            <div key={`${post.id}`} className={s.imageWrapper}>
              <Image
                src={post.images[0]?.url ?? "/icons/svg/person.svg"}
                alt={`Image of post ${post.id}`}
                width={post.images[0]?.width || 234}
                height={post.images[0]?.height || 228}
                className={s.image}
                loading="lazy"
              />
            </div>
          ))
        ) : (
          <p>Loading photos...</p>
        )}
        {isFetching && <p>Loading more posts...</p>}
      </section>
    </main>
  );
}
