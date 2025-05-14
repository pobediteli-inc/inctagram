"use client";

import { BaseModal, Button, Typography } from "common/components";
import s from "./modalPayments.module.css";

type Props = {
  close: () => void;
  open: boolean;
};

export const PaymentErrorModal = ({ open, close }: Props) => {
  return (
    <BaseModal open={open} onClose={close} modalTitle="Error" className={s.modalError}>
      <div className={s.modalContainer}>
        <Typography variant={"regular_16"}>Transaction failed. Please, write to support</Typography>
        <Button variant={"primary"} onClick={close} className={s.button}>
          Back to payment
        </Button>
      </div>
    </BaseModal>
  );
};
