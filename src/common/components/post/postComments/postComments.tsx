"use client";

import { PostData, useGetPostCommentsQuery } from "store/services/api/posts";
import { CommentItems } from "store/services/api/publicPosts";
import s from "common/components/post/postComments/postComments.module.css";
import { CommentWithAnswers } from "common/components/post/postComments/commentWithAnswers/commentWithAnswers";

type Props = {
  post: PostData;
};

export const PostComments = ({ post }: Props) => {
  const { data: comments } = useGetPostCommentsQuery({ postId: post.id });

  if (!comments?.items?.length) {
    return null;
  }

  return (
    <div className={s.commentsWrapper}>
      {comments?.items?.length &&
        comments.items.map((comment: CommentItems) => (
          <CommentWithAnswers key={comment.id} postId={post.id} comment={comment} />
        ))}
    </div>
  );
};
