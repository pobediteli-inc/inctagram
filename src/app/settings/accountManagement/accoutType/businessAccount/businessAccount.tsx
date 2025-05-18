"use client";

import React from "react";
import { RadioOptionProps } from "common/types";
import { Card, ControlledRadioGroup, Typography } from "common/components";
import { useForm, useWatch } from "react-hook-form";
import s from "./businessAccount.module.css";
import { Paypal, Stripe } from "assets/icons";

export const BusinessAccount = () => {
  const { control } = useForm({
    defaultValues: {
      businessAccount: "week" as Props,
    },
  });
  const subscriptionType = useWatch({
    control,
    name: "businessAccount",
    defaultValue: "week",
  });

  const subscriptions: RadioOptionProps[] = [
    { value: "week", label: "$10 per week" },
    { value: "month", label: "$35 per month" },
    { value: "year", label: "$350 per year" },
  ];

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
          options={subscriptions}
        />
      </Card>
      <div className={s.paymentSystems}>
        <Paypal width={96} height={64} color={"black"} />
        <Typography variant={"regular_14"} color={"light"}>
          Or
        </Typography>
        <Stripe width={96} height={64} color={"black"} />
      </div>
    </div>
  );
};

type Props = "week" | "month" | "year";
