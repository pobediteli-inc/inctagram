import { Post } from "store/services/api/posts/postsApi.types";
import { Avatar, DropdownItem, DropdownMenu, PostModal, Separator, Typography } from "common/components";
import s from "./myPost.module.css";
import { useState } from "react";
import { UpdatePostForm } from "./updatePostForm/updatePostForm";
import { Edit2Outline, TrashOutline } from "assets/icons";
import { DeletePostModal } from "./deletePostModal/deletePostModal";
import { Carousel } from "common/components/carousel/carousel";

type Props = {
  post: Post;
  isOpen: boolean;
  handleClose: () => void;
  handleDelete: (postId: number) => void;
  handleUpdate: (postId: number, description: string) => void;
};

export const MyPost = ({ post, isOpen, handleClose, handleDelete, handleUpdate }: Props) => {
  const [postIsUpdating, setPostIsUpdating] = useState(false);
  const [postIsDeleting, setPostIsDeleting] = useState(false);
  return (
    <PostModal className={s.container} open={isOpen} onClose={handleClose}>
      <Carousel slides={post.images} options={{ active: post.images.length > 1 }} />
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
        <div className={s.comments}>{post.description}</div>
        <Separator />
        <div className={s.interactions}>interactions</div>
        <Separator />
        <div className={s.leaveComment}>leave a comment</div>
      </div>
      <UpdatePostForm
        isOpen={postIsUpdating}
        avatar={post.avatarOwner}
        userName={post.userName}
        description={post.description}
        postId={post.id}
        handleClose={() => setPostIsUpdating(false)}
        handleUpdate={handleUpdate}
        photoPreview={post.images[0]?.url}
      />
      <DeletePostModal
        isOpen={postIsDeleting}
        postId={post.id}
        handleClose={() => setPostIsDeleting(false)}
        handleDelete={handleDelete}
      />
    </PostModal>
  );
};
