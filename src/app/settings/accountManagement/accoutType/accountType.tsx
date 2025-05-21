"use client";

import React, { FC } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Card, ControlledRadioGroup, Typography } from "common/components";
import s from "./accountType.module.css";
import { BusinessAccount } from "./businessAccount/businessAccount";
import { accountPlan } from "common/constants/paymentConstants";
import { AccountPlanProps } from "common/types";

export const AccountType: FC<Props> = ({ hasActiveSubscription }) => {
  const defaultAccountType = hasActiveSubscription ? "Business" : "Personal";

  const { control } = useForm({
    defaultValues: {
      accountType: defaultAccountType as AccountPlanProps,
    },
  });
  const accountType = useWatch({
    control,
    name: "accountType",
    defaultValue: defaultAccountType,
  });

  return (
    <div className={s.accountTypeWrapper}>
      <Typography variant={"h3"} color={"light"}>
        Account type:
      </Typography>
      <Card className={s.accountCard}>
        <ControlledRadioGroup
          className={s.radioGroup}
          labelClassName={s.label}
          control={control}
          name={"accountType"}
          options={accountPlan}
          disabled={hasActiveSubscription}
        />
      </Card>
      {accountType === "Business" && <BusinessAccount />}
    </div>
  );
};

type Props = {
  hasActiveSubscription: boolean;
};
