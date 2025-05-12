import { BaseModal, Button, Checkbox, Typography } from "common/components";
import s from "./modalPayments.module.css";
import { useState } from "react";

type Props = {
  close: () => void;
  open: boolean;
};

export const CreatePaymentModal = ({ open, close }: Props) => {
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  return (
    <BaseModal open={open} onClose={close} modalTitle="Create payment" className={s.modalCreate}>
      <div className={s.modalContainerCreate}>
        <Typography variant={"regular_16"}>
          Auto-renewal will be enabled with this payment. You can disable it anytime in your profile settings
        </Typography>
        <div className={s.buttonWrapper}>
          <Checkbox
            label="I agree"
            checked={isCheckboxChecked}
            onCheckedChange={() => setIsCheckboxChecked(!isCheckboxChecked)}
          />
          <Button variant={"primary"} disabled={!isCheckboxChecked}>
            OK
          </Button>
        </div>
      </div>
    </BaseModal>
  );
};
