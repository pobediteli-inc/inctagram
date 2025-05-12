import { BaseModal, Button, Typography } from "common/components";
import s from "./modalPayments.module.css";

type Props = {
  close: () => void;
  open: boolean;
};

export const PaymentSuccessModal = ({ open, close }: Props) => {
  return (
    <BaseModal open={open} onClose={close} modalTitle="Success" className={s.modalSuccess}>
      <div className={s.modalContainer}>
        <Typography variant={"regular_16"}>Payment was successful!</Typography>
        <Button variant={"primary"} onClick={close} className={s.button}>
          OK
        </Button>
      </div>
    </BaseModal>
  );
};
