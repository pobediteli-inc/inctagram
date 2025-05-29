import { BaseModal, Button, Typography } from "common/components";
import s from "./updatePostForm.module.css";

type Props = {
  isOpen: boolean;
  handleConfirm: () => void;
  handleCancel: () => void;
};

export const CloseModal = ({ isOpen, handleConfirm, handleCancel }: Props) => {
  return (
    <BaseModal open={isOpen} onClose={handleCancel} modalTitle={"Close Post"} className={s.closeModal}>
      <div className={s.content}>
        <Typography variant={"regular_16"}>
          Do you really want to close the edition of the publication? If you close changes won’t be saved
        </Typography>
        <div className={s.buttonContainer}>
          <Button variant={"outlined"} onClick={handleConfirm} className={s.button}>
            Yes
          </Button>
          <Button onClick={handleCancel} className={s.button}>
            No
          </Button>
        </div>
      </div>
    </BaseModal>
  );
};
