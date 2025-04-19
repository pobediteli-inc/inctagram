"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import s from "../page.module.css";
import { AllPublicPostsResponse, PostItemsResponse } from "store/services/api/publicPosts";
import defaultImage from "public/icons/svg/image.svg";

export default function PublicProfilePostsGrid({ posts }: { posts: AllPublicPostsResponse }) {
  const router = useRouter();

  return (
    <div className={s.grid}>
      {posts?.items?.length
        ? posts.items.map((post: PostItemsResponse) => (
            <div key={post.id} className={s.post} onClick={() => router.push(`?postId=${post.id}`)}>
              <Image
                src={post.images[0]?.url || defaultImage}
                width={post.images[0]?.width || 234}
                height={post.images[0]?.height || 228}
                alt="Profile Post"
                className={post.images[0]?.url ? s.image : s.defaultImage}
                priority
              />
            </div>
          ))
        : null}
    </div>
  );
}
