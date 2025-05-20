import { BaseModal, Button, Typography } from "common/components";
import s from "./modalPayments.module.css";

type Props = {
  onCloseAction: () => void;
  open: boolean;
};

export const PaymentSuccessModal = ({ open, onCloseAction }: Props) => {
  return (
    <BaseModal open={open} onClose={onCloseAction} modalTitle="Success" className={s.modalSuccess}>
      <div className={s.modalContainer}>
        <Typography variant={"regular_16"}>Payment was successful!</Typography>
        <Button variant={"primary"} onClick={onCloseAction} className={s.button}>
          OK
        </Button>
      </div>
    </BaseModal>
  );
};
