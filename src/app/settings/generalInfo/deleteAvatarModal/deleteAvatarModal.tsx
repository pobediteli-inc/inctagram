import { BaseModal, Button, Typography } from "common/components";
import s from "./deleteAvatarModal.module.css";
import { useDeleteProfileAvatarMutation } from "store/services/api/profile/profileApi";
import { useEffect } from "react";

type Props = {
  close: () => void;
  open: boolean;
};

export const DeleteAvatarModal = ({ open, close }: Props) => {
  const [deleteProfileAvatar, { isSuccess, isLoading }] = useDeleteProfileAvatarMutation();

  const deleteAvatarHandler = async () => {
    await deleteProfileAvatar().unwrap();
  };

  useEffect(() => {
    if (isSuccess) {
      close();
    }
  }, [isSuccess, close]);

  return (
    <BaseModal open={open} onClose={close} modalTitle="Delete Photo" className={s.modal}>
      <div className={s.modalContainer}>
        <Typography variant={"regular_16"} color={"light"}>
          Are you sure you want to delete the photo?
        </Typography>
        <div className={s.buttonWrapper}>
          <Button variant={"outlined"} className={s.modalButton} onClick={deleteAvatarHandler} disabled={isLoading}>
            Yes
          </Button>
          <Button className={s.modalButton} onClick={close} disabled={isLoading}>
            No
          </Button>
        </div>
      </div>
    </BaseModal>
  );
};
