import { BaseModal, Button, Typography } from "common/components";
import s from "./deletePostModal.module.css";
import { useDeletePostMutation } from "store/services/api/posts/postsApi";
import { useAppDispatch } from "common/hooks/useAppDispatch";
import { handleErrors } from "common/utils/handleErrors";

type Props = {
  isOpen: boolean;
  postId: number;
  handleClose: () => void;
  handleDelete: (postId: number) => void;
};

export const DeletePostModal = ({ isOpen, handleClose, postId, handleDelete }: Props) => {
  const [deletePost] = useDeletePostMutation();
  const dispatch = useAppDispatch();

  const handleConfirm = async () => {
    try {
      await deletePost({ postId });
      handleDelete(postId);
      handleClose();
    } catch (e) {
      handleErrors(e, dispatch);
    }
  };
  return (
    <BaseModal open={isOpen} onClose={handleClose} modalTitle={"Delete Post"} className={s.modal}>
      <div className={s.content}>
        <Typography variant={"regular_16"}>Are you sure you want to delete this post?</Typography>
        <div className={s.buttonsContainer}>
          <Button variant={"outlined"} className={s.button} onClick={handleConfirm}>
            Yes
          </Button>
          <Button className={s.button} onClick={handleClose}>
            No
          </Button>
        </div>
      </div>
    </BaseModal>
  );
};
