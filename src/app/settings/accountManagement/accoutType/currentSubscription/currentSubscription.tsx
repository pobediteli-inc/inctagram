import React, { useState } from "react";
import s from "./currentSubscription.module.css";
import { Card, Checkbox, Typography } from "common/components";
import { useCurrentPaymentSubscriptionsQuery } from "store/services/api/payments";
import { CancelAutoRenewalModal } from "../../modalPayments/cancelAutoRenewal";

export const CurrentSubscription = () => {
  const { data } = useCurrentPaymentSubscriptionsQuery();

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const nextPayment = data?.data?.[data?.data.length - 1].endDateOfSubscription.slice(0, 10).replaceAll("-", ".");

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
          {data?.data?.map((item, i) => (
            <Typography key={i} variant={"medium_14"} color={"light"}>
              {item.endDateOfSubscription.slice(0, 10).replaceAll("-", ".")}
            </Typography>
          ))}
        </div>
        <div className={s.nextPayment}>
          <Typography variant={"regular_14"} color={"dark"}>
            Next payment
          </Typography>
          <Typography variant={"medium_14"} color={"light"}>
            {data?.hasAutoRenewal && nextPayment}
          </Typography>
        </div>
      </Card>

      <Checkbox
        checked={data?.hasAutoRenewal}
        label={"Auto-Renewal"}
        onClick={() => setModalIsOpen(true)}
        disabled={!data?.hasAutoRenewal}
      />
      <CancelAutoRenewalModal isOpen={modalIsOpen} handleClose={() => setModalIsOpen(false)} />
    </div>
  );
};
