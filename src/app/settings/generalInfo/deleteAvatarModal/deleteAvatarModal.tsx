import { Button, Card, Typography } from "common/components";
import s from "./deleteAvatarModal.module.css";
import { Close } from "assets/icons";
import { useDeleteProfileAvatarMutation } from "store/services/api/profile/profileApi";
import { useEffect } from "react";

type Props = {
  close: () => void;
};

export const DeleteAvatarModal = ({ close }: Props) => {
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
    <div className={s.modal}>
      <Card className={s.card}>
        <div className={s.modalHeader}>
          <Typography variant={"h1"} color={"light"}>
            Delete Photo
          </Typography>
          <button className={s.closeBtn} onClick={close}>
            <Close width={24} height={24} />
          </button>
        </div>
        <div className={s.modalMessage}>
          <Typography variant={"regular_16"} color={"light"}>
            Are you sure you want to delete the photo?
          </Typography>
          <div className={s.buttonWrapper}>
            <Button variant={"outlined"} onClick={deleteAvatarHandler} disabled={isLoading}>
              Yes
            </Button>
            <Button onClick={close} disabled={isLoading}>
              No
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
