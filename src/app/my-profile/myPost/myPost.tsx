import { Post } from "store/services/posts/postsApi.types";
import { PostModal } from "common/components";
import s from "./myPost.module.css";
import { PostInfo } from "./postInfo/postInfo";
import { useState } from "react";
import { UpdatePostForm } from "./updatePostForm/updatePostForm";

type Props = {
  post: Post;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export const MyPost = ({ post, isOpen, setIsOpen }: Props) => {
  const [postIsUpdating, setPostIsUpdating] = useState(false);
  return (
    <PostModal className={s.container} open={isOpen} onClose={() => setIsOpen(false)}>
      <div>photos</div>
      {postIsUpdating ? (
        <UpdatePostForm />
      ) : (
        <PostInfo post={post} handleEditPostClick={() => setPostIsUpdating(true)} />
      )}
    </PostModal>
  );
};
