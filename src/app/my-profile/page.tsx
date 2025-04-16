"use client";

import s from "./myProfile.module.css";
import Image from "next/image";

type ImageType = {
  url: string;
  width: number;
  height: number;
  fileSize: number;
  createdAt: string;
  uploadId: string;
};

type Post = {
  id: number;
  images: ImageType[];
};

export default function MyProfile() {
  const posts = Array<Post>();

  return (
    <main className={s.main}>
      <section className={s.profileSection}>
        <div className={s.avatarWrapper}>
          <Image
            src="/profile-picture.jpg"
            alt="Profile Picture"
            layout="fill"
            objectFit="cover"
            className={s.avatar}
          />
        </div>

        <div>
          <div className={s.top}>
            <h2 className={s.profileName}>URLProfile</h2>
            <div className={s.actionButtons}>
              <button className={s.followButton}>Follow</button>
              <button className={s.messageButton}>Send Message</button>
            </div>
          </div>

          <div>
            <div className={s.stats}>
              <p>
                <span className={s.bold}>2,218</span> Following
              </p>
              <p>
                <span className={s.bold}>2,358</span> Followers
              </p>
              <p>
                <span className={s.bold}>2,764</span> Publications
              </p>
            </div>
            <p className={s.bio}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
              <a href="#" className={s.link}>
                {" "}
                More
              </a>
            </p>
          </div>
        </div>
      </section>

      <section className={s.gallery}>
        {posts.length > 0 ? (
          posts.flatMap((post) =>
            post.images.map((image, index) => (
              <div key={`${post.id}-${index}`} className={s.imageWrapper}>
                <Image
                  src={image.url}
                  alt={`Image ${index + 1} of post ${post.id}`}
                  width={image.width}
                  height={image.height}
                  className={s.image}
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
