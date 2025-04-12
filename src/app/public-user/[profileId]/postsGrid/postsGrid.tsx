"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import s from "../page.module.css";
import { Post } from "store/services/publicPostApi/publicPostApi.types";

type Posts = {
  totalCount: number;
  pageSize: number;
  totalUsers: number;
  items: Post[];
};

export default function PublicProfilePostsGrid({ posts }: { posts: Posts }) {
  const router = useRouter();

  return (
    <div className={s.grid}>
      {posts?.items?.length
        ? posts.items.map((post: Post) => (
            <div key={post.id} className={s.post} onClick={() => router.push(`?postId=${post.id}`)}>
              <Image
                src={post.images[0].url}
                width={post.images[0].width}
                height={post.images[0].height}
                alt="Profile Post"
                className={s.image}
                priority
              />
            </div>
          ))
        : null}
    </div>
  );
}
