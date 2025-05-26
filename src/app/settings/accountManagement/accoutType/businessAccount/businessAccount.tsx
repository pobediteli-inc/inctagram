"use client";

import React, { useState } from "react";
import { BusinessAccountProps, ModalPaymentProps } from "common/types";
import { Card, ControlledRadioGroup, Typography } from "common/components";
import { useForm, useWatch } from "react-hook-form";
import s from "./businessAccount.module.css";
import { Paypal, Stripe } from "assets/icons";
import { CreatePaymentModal } from "../../modalPayments/createPayment";
import { usePayment } from "./hooks/usePayment";
import { useAppDispatch } from "common/hooks";
import { handleErrors } from "common/utils";
import { typeSubscriptions } from "common/constants/paymentConstants";

export const BusinessAccount = () => {
  const [activeModal, setActiveModal] = useState<ModalPaymentProps>(null);
  const dispatch = useAppDispatch();
  const { handlePayment } = usePayment();

  const { control } = useForm({
    defaultValues: {
      businessAccount: "DAY" as BusinessAccountProps,
    },
  });
  const subscriptionType = useWatch({
    control,
    name: "businessAccount",
    defaultValue: "DAY",
  });

  const handleStripe = () => setActiveModal("create");
  const confirmPayment = async () => {
    setActiveModal(null);
    try {
      await handlePayment(subscriptionType, "STRIPE");
    } catch (error: unknown) {
      handleErrors(error, dispatch);
    }
  };

  return (
    <div className={s.businessAccountWrapper}>
      <Typography variant={"h3"} color={"light"}>
        Your subscription costs:
      </Typography>
      <Card className={s.businessCard}>
        <ControlledRadioGroup
          className={s.radioGroup}
          labelClassName={s.label}
          control={control}
          name={"businessAccount"}
          options={typeSubscriptions}
        />
      </Card>
      <div className={s.paymentSystems}>
        <Paypal className={s.paypal} width={96} height={64} color={"var(--dark-500)"} />
        <Typography variant={"regular_14"} color={"light"}>
          Or
        </Typography>
        <Stripe className={s.stripe} width={96} height={64} color={"var(--dark-500)"} onClick={handleStripe} />
      </div>
      <CreatePaymentModal
        open={activeModal === "create"}
        onCloseAction={() => setActiveModal(null)}
        onConfirmAction={confirmPayment}
      />
    </div>
  );
};
