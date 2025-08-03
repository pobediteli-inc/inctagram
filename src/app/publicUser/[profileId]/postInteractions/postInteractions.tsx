"use client";

import s from "./postInteractions.module.css";
import { PostItemsResponse } from "store/services/api/publicPosts";
import { BookmarkOutline, Heart, HeartOutline, PaperPlaneOutline, Person } from "assets/icons";
import { Typography } from "common/components";
import {
  PostData,
  useGetLikedPostUsersQuery,
  useGetPostByIdQuery,
  useUpdateLikeStatusPostMutation,
} from "store/services/api/posts";
import { useAppDispatch } from "common/hooks";
import { handleErrors } from "common/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ROUTES } from "common/constants/routes";

export const PostInteractions = ({ posts }: Posts) => {
  const [updateLikes] = useUpdateLikeStatusPostMutation();
  const { data: likedUsers } = useGetLikedPostUsersQuery({ postId: posts.id });
  const { data: post } = useGetPostByIdQuery({ postId: posts.id });
  const dispatch = useAppDispatch();
  const router = useRouter();

  const date = new Date(posts.createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const likedUser = likedUsers?.items ?? [];
  const isLiked = post?.isLiked ?? posts.isLiked;
  const likesCount = likedUsers?.totalCount ?? posts.likesCount;

  const handleLikes = async () => {
    try {
      const newStatus = isLiked ? "NONE" : "LIKE";
      await updateLikes({ postId: posts.id, likeStatus: newStatus }).unwrap();
    } catch (error: unknown) {
      handleErrors(error, dispatch);
    }
  };
  const toUserProfile = (userId: number) => router.push(ROUTES.publicUser(userId));
  const likedUserAvatar = likedUser.map((user) =>
    user.avatars[0]?.url ? (
      <Image
        key={user.userId}
        className={s.avatar}
        src={user.avatars[0]?.url}
        alt={user.userName}
        width={24}
        height={24}
        onClick={() => toUserProfile(user.userId)}
      />
    ) : (
      <Person
        key={user.userId}
        className={s.avatar}
        width={24}
        height={24}
        onClick={() => toUserProfile(user.userId)}
      />
    )
  );

  return (
    <div className={s.interactionsWrapper}>
      <div className={s.iconsWrapper}>
        <div className={s.icons}>
          {isLiked ? (
            <Heart className={s.likeIcon} width={24} height={24} onClick={handleLikes} color={"var(--danger-300)"} />
          ) : (
            <HeartOutline className={s.likeIcon} width={24} height={24} onClick={handleLikes} />
          )}
          <PaperPlaneOutline className={s.shareIcon} width={24} height={24} />
        </div>
        <BookmarkOutline className={s.bookmarkIcon} width={24} height={24} />
      </div>
      <div className={s.likeCountWrapper}>
        <div className={s.likedUserAvatar}>{likedUserAvatar}</div>
        <div className={s.likes}>
          {likesCount}
          <Typography variant={"bold_14"} color={"light"} asChild>
            <span> &#34;Like&#34;</span>
          </Typography>
        </div>
      </div>
      <Typography variant={"small"} color={"dark"}>
        {date}
      </Typography>
    </div>
  );
};

type Posts = {
  posts: PostItemsResponse | PostData;
};
