import { BaseModal, Button, Typography } from "common/components";
import s from "./cancelAutoRenewal.module.css";
import { useAppDispatch } from "common/hooks/useAppDispatch";
import { handleErrors } from "common/utils/handleErrors";
import { useCancelAutoRenewalMutation } from "store/services/api/payments";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
};

export const CancelAutoRenewalModal = ({ isOpen, handleClose }: Props) => {
  const [cancelAutoRenewal] = useCancelAutoRenewalMutation();
  const dispatch = useAppDispatch();

  const handleConfirm = async () => {
    try {
      await cancelAutoRenewal();
      handleClose();
    } catch (e) {
      handleErrors(e, dispatch);
    }
  };
  return (
    <BaseModal open={isOpen} onClose={handleClose} modalTitle={"Cancel Auto-Renewal"} className={s.modal}>
      <div className={s.content}>
        <Typography variant={"regular_16"}>
          Are you sure you want to cancel auto-renewal? You will not be able to renew your subscription after that.
        </Typography>
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
