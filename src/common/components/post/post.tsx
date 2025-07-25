"use client";

import { PostData as PostType } from "store/services/api/posts/postsApi.types";
import { Avatar, Carousel, DropdownItem, DropdownMenu, PostModal, Separator, Typography } from "common/components";
import s from "./post.module.css";
import { useState } from "react";
import { PostComments } from "common/components/post/postComments/postComments";
import { UpdatePostForm } from "common/components/post/updatePostForm/updatePostForm";
import { DeletePostModal } from "common/components/post/deletePostModal/deletePostModal";
import { Edit2Outline, TrashOutline } from "assets/icons";

type Props = {
  post: PostType;
  isOpen: boolean;
  handleCloseAction: () => void;
  handleDeleteAction?: (postId: number) => void;
  handleUpdateAction?: (postId: number, description: string) => void;
  isEditable: boolean;
};

export const Post = ({
  post,
  isOpen,
  handleCloseAction,
  handleDeleteAction,
  handleUpdateAction,
  isEditable,
}: Props) => {
  const [postIsUpdating, setPostIsUpdating] = useState(false);
  const [postIsDeleting, setPostIsDeleting] = useState(false);

  const imageUrls = post.images.map((img) => img.url);

  return (
    <PostModal className={s.container} open={isOpen} onClose={handleCloseAction}>
      <Carousel slides={imageUrls} options={{ active: post.images.length > 1 }} />

      <div className={s.photoActionsContainer}>
        <div className={s.ownerInfo}>
          <Avatar src={post.avatarOwner} className={s.avatar} />
          <Typography variant={"h3"}>{post.userName}</Typography>
          {isEditable && (
            <DropdownMenu className={s.menu}>
              <DropdownItem className={s.menuItem} onClick={() => setPostIsUpdating(true)}>
                <Edit2Outline width={24} height={24} />
                <Typography variant={"regular_14"}>Edit Post</Typography>
              </DropdownItem>
              <DropdownItem className={s.menuItem} onClick={() => setPostIsDeleting(true)}>
                <TrashOutline width={24} height={24} />
                <Typography variant={"regular_14"}>Delete Post</Typography>
              </DropdownItem>
            </DropdownMenu>
          )}
        </div>

        <Separator />

        <PostComments post={post} />

        <Separator />

        <div className={s.interactions}>interactions</div>

        <Separator />

        <div className={s.leaveComment}>leave a comment</div>
      </div>

      {isEditable && handleUpdateAction && (
        <UpdatePostForm
          isOpen={postIsUpdating}
          avatar={post.avatarOwner}
          userName={post.userName}
          description={post.description}
          postId={post.id}
          handleCloseAction={() => setPostIsUpdating(false)}
          handleUpdateAction={handleUpdateAction}
          photoPreview={post.images[0]?.url}
        />
      )}

      {isEditable && handleDeleteAction && (
        <DeletePostModal
          isOpen={postIsDeleting}
          postId={post.id}
          handleCloseAction={() => setPostIsDeleting(false)}
          handleDeleteAction={handleDeleteAction}
        />
      )}
    </PostModal>
  );
};
