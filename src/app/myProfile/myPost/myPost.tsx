"use client";

import { useState } from "react";
import { Avatar, Carousel, DropdownItem, DropdownMenu, PostModal, Separator, Typography } from "common/components";
import { useHandleAddComment } from "common/hooks";
import { Edit2Outline, TrashOutline } from "assets/icons";
import { Post } from "store/services/api/posts/postsApi.types";
import { UpdatePostForm } from "./updatePostForm/updatePostForm";
import { DeletePostModal } from "./deletePostModal/deletePostModal";
import { PostComments } from "./postComments/postComments";
import { CommentForm } from "app/myProfile/myPost/сommentForm/commentForm";
import s from "./myPost.module.css";

type Props = {
  post: Post;
  isOpen: boolean;
  handleCloseAction: () => void;
  handleDeleteAction: (postId: number) => void;
  handleUpdateAction: (postId: number, description: string) => void;
};

export const MyPost = ({ post, isOpen, handleCloseAction, handleDeleteAction, handleUpdateAction }: Props) => {
  const [postIsUpdating, setPostIsUpdating] = useState(false);
  const [postIsDeleting, setPostIsDeleting] = useState(false);
  const imageUrls = post.images.map((img) => img.url);
  const handleAddCommentAction = useHandleAddComment();

  return (
    <PostModal className={s.container} open={isOpen} onClose={handleCloseAction}>
      <Carousel slides={imageUrls} options={{ active: post.images.length > 1 }} />
      <div className={s.photoActionsContainer}>
        <div className={s.ownerInfo}>
          <Avatar src={post.avatarOwner} className={s.avatar} />
          <Typography variant={"h3"}>{post.userName}</Typography>
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
        </div>
        <Separator />
        <PostComments post={post} />
        <Separator />
        <div className={s.interactions}>interactions</div>
        <Separator />
        <CommentForm postId={post.id} onCommentSubmitAction={handleAddCommentAction} />
      </div>
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
      <DeletePostModal
        isOpen={postIsDeleting}
        postId={post.id}
        handleCloseAction={() => setPostIsDeleting(false)}
        handleDeleteAction={handleDeleteAction}
      />
    </PostModal>
  );
};
