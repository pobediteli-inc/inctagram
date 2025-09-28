"use client";

import { PostData, useGetPostCommentsQuery } from "store/services/api/posts";
import { CommentItems } from "store/services/api/publicPosts";
import s from "common/components/post/postComments/postComments.module.css";
import { CommentWithAnswers } from "common/components/post/postComments/commentWithAnswers/commentWithAnswers";
import { useState } from "react";
import { Typography } from "common/components/typography/typography";

type Props = {
  post: PostData;
  isHidden?: boolean;
};

export const PostComments = ({ post, isHidden = false }: Props) => {
  const { data: comments } = useGetPostCommentsQuery({ postId: post.id });
  const [isCommentsHidden, setIsCommentsHidden] = useState(isHidden);

  if (!comments?.items?.length) {
    return null;
  }

  return (
    <>
      {isHidden ? (
        isCommentsHidden ? (
          <Typography
            variant={"bold_14"}
            color={"dark"}
            onClick={() => setIsCommentsHidden(false)}
            className={s.showComments}
          >
            View All Comments ({comments?.items?.length})
          </Typography>
        ) : (
          <Typography
            variant={"bold_14"}
            color={"dark"}
            onClick={() => setIsCommentsHidden(true)}
            className={s.showComments}
          >
            Hide All Comments
          </Typography>
        )
      ) : null}
      {!isCommentsHidden && (
        <div className={s.commentsWrapper}>
          {comments?.items?.length &&
            comments.items.map((comment: CommentItems) => (
              <CommentWithAnswers key={comment.id} postId={post.id} comment={comment} />
            ))}
        </div>
      )}
    </>
  );
};
