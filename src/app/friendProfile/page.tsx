import styles from "./page.module.css";

import Image from "next/image";

type ImageType = {
  url: string;
  width: number;
  height: number;
  fileSize: number;
  createdAt: string;
  uploadId: string;
};

type PostType = {
  id: number;
  images: ImageType[];
};

export default function UserProfile() {
  const posts = Array<PostType>();

  return (
    <main className={styles.main}>
      <section className={styles.profileSection}>
        <div className={styles.avatarWrapper}>
          <Image
            src="/profile-picture.jpg"
            alt="Profile Picture"
            layout="fill"
            objectFit="cover"
            className={styles.avatar}
          />
        </div>

        <div>
          <div className={styles.top}>
            <h2 className={styles.profileName}>URLProfile</h2>
            <div className={styles.actionButtons}>
              <button className={styles.followButton}>Unfollow</button>
              <button className={styles.messageButton}>Send Message</button>
            </div>
          </div>

          <div>
            <div className={styles.stats}>
              <p>
                <span className={styles.bold}>2,218</span> Following
              </p>
              <p>
                <span className={styles.bold}>2,358</span> Followers
              </p>
              <p>
                <span className={styles.bold}>2,764</span> Publications
              </p>
            </div>
            <p className={styles.bio}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
              <a href="#" className={styles.link}>
                {" "}
                More
              </a>
            </p>
          </div>
        </div>
      </section>

      <section className={styles.gallery}>
        {posts.length > 0 ? (
          posts.flatMap((post) =>
            post.images.map((image, index) => (
              <div key={`${post.id}-${index}`} className={styles.imageWrapper}>
                <Image
                  src={image.url}
                  alt={`Image ${index + 1} of post ${post.id}`}
                  width={image.width}
                  height={image.height}
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
