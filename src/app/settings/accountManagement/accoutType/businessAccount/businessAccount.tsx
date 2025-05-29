"use client";

import { useState } from "react";
import { BusinessAccountProps, ModalPaymentProps } from "common/types";
import { Card, RadioGroup, Typography } from "common/components";
import s from "./businessAccount.module.css";
import { Paypal, Stripe } from "assets/icons";
import { CreatePaymentModal } from "../../modalPayments/createPayment";
import { usePayment } from "./hooks/usePayment";
import { useAppDispatch } from "common/hooks";
import { handleErrors } from "common/utils";
import { typeSubscriptions } from "common/constants/paymentConstants";

export const BusinessAccount = () => {
  const [activeModal, setActiveModal] = useState<ModalPaymentProps>(null);
  const [subscriptionType, setSubscriptionType] = useState<BusinessAccountProps>("DAY");
  const dispatch = useAppDispatch();
  const { handlePayment } = usePayment();

  const handleStripe = () => setActiveModal("create");
  const confirmPayment = async () => {
    setActiveModal(null);
    try {
      await handlePayment(subscriptionType, "STRIPE");
    } catch (error: unknown) {
      handleErrors(error, dispatch);
    }
  };
  const handleSubscription = (value: BusinessAccountProps) => setSubscriptionType(value);

  return (
    <div className={s.businessAccountWrapper}>
      <Typography variant={"h3"} color={"light"}>
        Your subscription costs:
      </Typography>
      <Card className={s.businessCard}>
        <RadioGroup
          className={s.radioGroup}
          labelClassName={s.label}
          value={subscriptionType}
          onValueChange={handleSubscription}
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
