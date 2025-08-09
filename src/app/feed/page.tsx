"use client";

import { useGetFollowedPublicationsQuery } from "store/services/api/feed";
import { DEFAULT_CURSOR_ID, DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from "common/constants/pagination";
import { Avatar, Carousel, CommentForm, Separator, Typography } from "common/components";
import { timeAgo } from "common/utils/timeAgo";
import s from "./feed.module.css";
import { PostComments } from "common/components/post/postComments/postComments";
import { PostInteractions } from "app/publicUser/[profileId]/postInteractions/postInteractions";
import { PostDescription } from "common/components/post/postDescription/postDescription";
import { useHandleAddComment } from "common/hooks";

export default function Feed() {
  const { data } = useGetFollowedPublicationsQuery({
    pageSize: DEFAULT_PAGE_SIZE,
    pageNumber: DEFAULT_PAGE_NUMBER,
    endCursorPostId: DEFAULT_CURSOR_ID,
  });

  const handleAddCommentAction = useHandleAddComment();

  return (
    <div className={s.feed}>
      {data?.items.map((p) => {
        const imageUrls = p.images.map((image) => image.url);

        return (
          <div key={p.id} className={s.postWrapper}>
            <div className={s.postData}>
              <Avatar size={"small"} src={p.avatarOwner} className={s.avatar} />
              <Typography variant={"h3"} className={s.userName}>
                {p.userName}
              </Typography>
              <Typography variant={"small"} color={"dark"}>
                {timeAgo(p.createdAt)}
              </Typography>
            </div>
            <Carousel slides={imageUrls} />
            <PostInteractions posts={p} />
            {p.description && <PostDescription post={p} />}
            <PostComments post={p} />
            <CommentForm postId={p.id} onCommentSubmitAction={handleAddCommentAction} className={s.commentForm} />
            <Separator />
          </div>
        );
      })}
    </div>
  );
}
