"use client";

import styles from "./page.module.css";
import Image from "next/image";
import { useGetProfileByUserNameQuery } from "store/services/profileApi/profileApi";
import { useGetPostsByUserNameQuery } from "store/services/postsApi/postsApi";

export default function MyProfile() {
  const { data } = useGetProfileByUserNameQuery({ userName: "Irina124" });
  console.log("data: ", data);

  const { data: PostsWithMeta } = useGetPostsByUserNameQuery({ userName: "Irina124", pageSize: 8 });
  console.log("PostsWithMeta", PostsWithMeta);

  const posts = PostsWithMeta?.items;

  if (!posts) {
    return <p>Loading photos...</p>;
  }

  return (
    <main className={styles.main}>
      <section className={styles.profileSection}>
        <div className={styles.avatarWrapper}>
          <Image
            src={data?.avatars[0]?.url ?? "/icons/svg/person.svg"}
            alt="Profile Picture"
            layout="fill"
            objectFit="cover"
            className={styles.avatar}
          />
        </div>

        <div>
          <div className={styles.top}>
            <h2 className={styles.profileName}>{data?.userName}</h2>
            <div className={styles.actionButtons}>
              <button className={styles.profileSettingsButton}>Profile Settings</button>
            </div>
          </div>

          <div>
            <div className={styles.stats}>
              <p>
                <span className={styles.bold}>{data?.followingCount}</span> Following
              </p>
              <p>
                <span className={styles.bold}>{data?.followersCount}</span> Followers
              </p>
              <p>
                <span className={styles.bold}>{data?.publicationsCount}</span> Publications
              </p>
            </div>
            <p className={styles.bio}>
              {data?.aboutMe ??
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et " +
                  "dolore magna aliqua."}
              <a href="#" className={styles.link}>
                {" "}
                More
              </a>
            </p>
          </div>
        </div>
      </section>

      <section className={styles.gallery}>
        {posts?.length > 0 ? (
          posts?.flatMap((post) =>
            post.images.map((image, index) => (
              <div key={`${post.id}-${index}`} className={styles.imageWrapper}>
                <Image
                  src={image.url}
                  alt={`Image ${index + 1} of post ${post.id}`}
                  width={image.width || 234}
                  height={image.height || 228}
                  className={styles.image}
                  loading="lazy"
                />
              </div>
            ))
          )
        ) : (
          <p>Loading photos...</p>
        )}
      </section>
    </main>
  );
}
