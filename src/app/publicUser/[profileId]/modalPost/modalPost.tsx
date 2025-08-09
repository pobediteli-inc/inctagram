"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useRouter } from "next/navigation";
import s from "./modalPost.module.css";
import { Typography } from "common/components";
import Image from "next/image";
import defaultAvatar from "public/icons/svg/person.svg";
import defaultImage from "public/icons/svg/image.svg";
import answerLine from "public/icons/svg/answer-line.svg";
import { ArrowIosBackOutline, ArrowIosForwardOutline, Close } from "assets/icons";
import { useState } from "react";
import { formatRelativeTime } from "common/utils/dateUtils";
import { CommentsResponse, PostItemsResponse } from "store/services/api/publicPosts";
import { PostInteractions } from "../postInteractions/postInteractions";

type ModalPostProps = {
  post: PostItemsResponse;
  comments?: CommentsResponse | null;
};

export default function ModalPost({ post, comments }: ModalPostProps) {
  const handleNextImage = () => {
    setCurrentImage((prev) => (prev + 1) % post.images.length);
  };

  const handlePrevImage = () => {
    setCurrentImage((prev) => (prev - 1 + post.images.length) % post.images.length);
  };

  const handleClosePost = () => {
    router.push(window.location.pathname);
  };

  const router = useRouter();
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <Dialog.Root open={true} onOpenChange={handleClosePost}>
      <Dialog.Portal>
        <Dialog.Overlay className={s.overlay} />
        <Dialog.Content className={s.content}>
          <VisuallyHidden>
            <Dialog.Title>Post</Dialog.Title>
          </VisuallyHidden>
          <div className={s.container}>
            <div className={s.imageWrapper}>
              <Image
                src={post.images[currentImage]?.url || defaultImage}
                alt="Post Image"
                width={post.images[currentImage]?.width}
                height={post.images[currentImage]?.height}
                className={post.images[currentImage]?.url ? s.image : s.defaultImage}
              />
              {post.images.length > 1 && (
                <ArrowIosBackOutline width={48} height={48} className={s.imageLeftArrow} onClick={handlePrevImage} />
              )}
              {post.images.length > 1 && (
                <ArrowIosForwardOutline
                  width={48}
                  height={48}
                  className={s.imageRightArrow}
                  onClick={handleNextImage}
                />
              )}
              {post.images.length > 1 && (
                <div className={s.dotsWrapper}>
                  {post.images.map((image, index) => (
                    <span
                      key={index}
                      className={`${s.dot} ${index === currentImage ? s.activeDot : ""}`}
                      onClick={() => setCurrentImage(index)}
                    />
                  ))}
                </div>
              )}
            </div>
            <div className={s.infoWrapper}>
              <div className={s.avatarWithNameWrapper}>
                <div className={s.avatarWithName}>
                  <div className={s.avatarWrapper}>
                    <Image
                      src={post.avatarOwner || defaultAvatar}
                      alt="Post Creator Avatar"
                      fill
                      sizes="36px"
                      className={post.avatarOwner ? s.avatar : s.defaultAvatar}
                    />
                  </div>
                  <Typography variant={"h3"} className={s.name}>
                    {post.userName}
                  </Typography>
                </div>
              </div>
              <div className={s.commentsWrapper}>
                {post.description ? (
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
                      <Typography variant={"small"} color={"dark"} className={s.timeAgoText}>
                        {formatRelativeTime(post.createdAt)}
                      </Typography>
                    </div>
                  </div>
                ) : null}
                {comments?.items?.length
                  ? comments.items.map((comment) => (
                      <div key={comment.id} className={s.avatarWithComment}>
                        <div className={s.commentAvatarWrapper}>
                          <Image
                            src={comment.from.avatars[0]?.url || defaultAvatar}
                            alt="User Comment Avatar"
                            fill
                            sizes="36px"
                            className={comment.from.avatars[0] ? s.avatar : s.defaultAvatar}
                          />
                        </div>
                        <div className={s.commentWrapper}>
                          <Typography variant={"bold_14"}>
                            {comment.from.username} <span className={s.commentText}>{comment.content}</span>
                          </Typography>
                          <Typography variant={"small"} color={"dark"} className={s.timeAgoText}>
                            {formatRelativeTime(comment.createdAt)}
                          </Typography>
                          {comment.answerCount > 0 && (
                            <div className={s.answersWrapper}>
                              <Image
                                src={answerLine}
                                alt="Line Of Answers"
                                width={24}
                                height={1}
                                className={s.answerLine}
                              />
                              <Typography variant={"bold_small"} color={"dark"}>
                                View Answers ({comment.answerCount})
                              </Typography>
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  : null}
              </div>
              <PostInteractions posts={post} />
            </div>
          </div>
          <Dialog.Close asChild>
            <button className={s.iconButton} onClick={handleClosePost}>
              <Close width={"24px"} height={"24px"} />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
