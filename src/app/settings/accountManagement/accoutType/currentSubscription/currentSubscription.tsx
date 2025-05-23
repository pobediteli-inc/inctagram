import React from "react";
import s from "./currentSubscription.module.css";
import { Card, ControlledCheckbox, Typography } from "common/components";
import { useCurrentPaymentSubscriptionsQuery } from "store/services/api/payments";
import { useForm } from "react-hook-form";

export const CurrentSubscription = () => {
  const { data } = useCurrentPaymentSubscriptionsQuery();
  const { control } = useForm({
    defaultValues: {
      autoRenewal: true,
    },
  });

  const expiredAt = data?.data?.[0].dateOfPayment.slice(0, 10).replaceAll("-", ".");
  const nextPayment = data?.data?.[0].endDateOfSubscription.slice(0, 10).replaceAll("-", ".");

  return (
    <div className={s.mainCurrentSubscriptionWrapper}>
      <Typography className={s.title} variant={"h3"} color={"light"}>
        Current Subscription:
      </Typography>
      <Card className={s.cardWrapper}>
        <div className={s.expireAt}>
          <Typography variant={"regular_14"} color={"dark"}>
            Expire at
          </Typography>
          <Typography variant={"medium_14"} color={"light"}>
            {expiredAt}
          </Typography>
        </div>
        <div className={s.nextPayment}>
          <Typography variant={"regular_14"} color={"dark"}>
            Next payment
          </Typography>
          <Typography variant={"medium_14"} color={"light"}>
            {nextPayment}
          </Typography>
        </div>
      </Card>
      <ControlledCheckbox control={control} name={"autoRenewal"} label={"Auto-renewal"} />
    </div>
  );
};
