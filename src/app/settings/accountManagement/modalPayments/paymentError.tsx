import { BaseModal, Button, Typography } from "common/components";
import s from "./modalPayments.module.css";

type Props = {
  onCloseAction: () => void;
  open: boolean;
};

export const PaymentErrorModal = ({ open, onCloseAction }: Props) => {
  return (
    <BaseModal open={open} onClose={onCloseAction} modalTitle="Error" className={s.modalError}>
      <div className={s.modalContainer}>
        <Typography variant={"regular_16"}>Transaction failed. Please, write to support</Typography>
        <Button variant={"primary"} onClick={onCloseAction} className={s.button}>
          Back to payment
        </Button>
      </div>
    </BaseModal>
  );
};
