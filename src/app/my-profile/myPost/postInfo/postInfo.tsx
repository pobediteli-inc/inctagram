import s from "./postInfo.module.css";
import { DropdownItem, DropdownMenu, Separator, Typography, Avatar } from "common/components";
import { Edit2Outline, TrashOutline } from "assets/icons";
import { Post } from "store/services/posts/postsApi.types";

type Props = {
  post: Post;
  handleEditPostClick: () => void;
};

export const PostInfo = ({ post, handleEditPostClick }: Props) => {
  return (
    <div className={s.photoActionsContainer}>
      <div className={s.ownerInfo}>
        <Avatar src={post.avatarOwner} className={s.avatar} />
        <Typography variant={"h3"}>{post.userName}</Typography>
        <DropdownMenu className={s.menu}>
          <DropdownItem className={s.menuItem} onClick={handleEditPostClick}>
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
  );
};
