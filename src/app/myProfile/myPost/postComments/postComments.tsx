"use client";

import { Typography } from "common/components";
import { formatRelativeTime } from "common/utils/dateUtils";
import Image from "next/image";
import { Post, useGetPostCommentsQuery } from "store/services/api/posts";
import { CommentItems } from "store/services/api/publicPosts";
import defaultAvatar from "public/icons/svg/person.svg";
import s from "./postComments.module.css";
import { CommentWithAnswers } from "./commentWithAnswers/commentWithAnswers";

type Props = {
  post: Post;
};

export const PostComments = ({ post }: Props) => {
  const { data: comments } = useGetPostCommentsQuery({ postId: post.id });

  return (
    <div className={s.commentsWrapper}>
      {post.description && (
        <div className={s.avatarWithComment}>
          <div className={s.commentAvatarWrapper}>
            <Image
              src={post.avatarOwner || defaultAvatar}
              alt="Post Description Avatar"
              fill
              sizes="36px"
              className={post.avatarOwner ? s.avatar : s.defaultAvatar}
            />
          </div>
          <div className={s.commentWrapper}>
            <Typography variant={"bold_14"}>
              {post.userName} <span className={s.commentText}>{post.description}</span>
            </Typography>
            <Typography variant={"small"} color={"dark"} className={s.timeLikeAnswerText}>
              {formatRelativeTime(post.createdAt)}
            </Typography>
          </div>
        </div>
      )}

      {comments?.items?.length &&
        comments.items.map((comment: CommentItems) => (
          <CommentWithAnswers key={comment.id} postId={post.id} comment={comment} />
        ))}
    </div>
  );
};
