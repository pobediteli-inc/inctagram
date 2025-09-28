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
        ? posts.items.map((post: PostItemsResponse) => {
            const firstImage = post.images[0];
            return (
              <div key={post.id} className={s.post} onClick={() => router.push(`?postId=${post.id}`)}>
                <Image
                  src={firstImage?.url || defaultImage}
                  width={firstImage?.width || 234}
                  height={firstImage?.height || 228}
                  alt="Profile Post"
                  className={firstImage?.url ? s.image : s.defaultImage}
                  priority
                />
              </div>
            );
          })
        : null}
    </div>
  );
}
