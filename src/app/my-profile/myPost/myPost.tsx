import { Post } from "store/services/posts/postsApi.types";
import { PostModal, Separator, Typography, DropdownItem, DropdownMenu } from "common/components";
import s from "./myPost.module.css";
import { Edit2Outline, TrashOutline } from "assets/icons";

type Props = {
  post: Post;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export const MyPost = ({ post, isOpen, setIsOpen }: Props) => {
  return (
    <PostModal className={s.container} open={isOpen} onClose={() => setIsOpen(false)}>
      <div>photos</div>
      <div className={s.photoActionsContainer}>
        <div className={s.ownerInfo}>
          <img src={post.avatarOwner} alt={"avatar owner"} className={s.avatar} />
          <Typography variant={"h3"}>{post.userName}</Typography>
          <DropdownMenu className={s.menu}>
            <DropdownItem className={s.menuItem}>
              <Edit2Outline width={24} height={24} />
              <Typography variant={"regular_14"}>Edit Post</Typography>
            </DropdownItem>
            <DropdownItem className={s.menuItem}>
              <TrashOutline width={24} height={24} />
              <Typography variant={"regular_14"}>Delete Post</Typography>
            </DropdownItem>
          </DropdownMenu>
        </div>
        <Separator />
        <div className={s.comments}>comments</div>
        <Separator />
        <div className={s.interactions}>interactions</div>
        <Separator />
        <div className={s.leaveComment}>leave a comment</div>
      </div>
    </PostModal>
  );
};
