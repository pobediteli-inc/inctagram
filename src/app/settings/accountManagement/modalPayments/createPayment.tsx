"use client";

import { BaseModal, Button, Checkbox, Typography } from "common/components";
import s from "./modalPayments.module.css";
import { useState } from "react";

type Props = {
  open: boolean;
  onCloseAction: () => void;
  onConfirmAction: () => void;
};

export const CreatePaymentModal = ({ open, onCloseAction, onConfirmAction }: Props) => {
  const [isAgreed, setIsAgreed] = useState(false);

  const handleConfirm = () => {
    if (!isAgreed) return;
    onConfirmAction();
    setIsAgreed(false);
  };

  const handleClose = () => {
    onCloseAction();
    setIsAgreed(false);
  };

  return (
    <BaseModal open={open} onClose={handleClose} modalTitle="Create payment" className={s.modalCreate}>
      <div className={s.modalContainerCreate}>
        <Typography variant="regular_16">
          Auto-renewal will be enabled with this payment. You can disable it anytime in your profile settings.
        </Typography>

        <div className={s.buttonWrapper}>
          <Checkbox label="I agree" checked={isAgreed} onCheckedChange={() => setIsAgreed((prev) => !prev)} />
          <Button variant="primary" disabled={!isAgreed} onClick={handleConfirm}>
            OK
          </Button>
        </div>
      </div>
    </BaseModal>
  );
};
