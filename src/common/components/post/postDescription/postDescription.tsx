"use client";

import { Avatar, Typography } from "common/components/index";
import { formatRelativeTime } from "common/utils/dateUtils";
import { PostData } from "store/services/api/posts";
import s from "./postDescription.module.css";

type Props = {
  post: PostData;
};

export const PostDescription = ({ post }: Props) => {
  return (
    <div className={s.avatarWithComment}>
      <Avatar src={post.avatarOwner} />
      <div className={s.commentWrapper}>
        <Typography variant={"bold_14"}>
          {post.userName}
          <Typography asChild variant={"regular_14"}>
            <span>&#32;{post.description}</span>
          </Typography>
        </Typography>

        <Typography variant={"small"} color={"dark"} className={s.timeLikeAnswerText}>
          {formatRelativeTime(post.createdAt)}
        </Typography>
      </div>
    </div>
  );
};
