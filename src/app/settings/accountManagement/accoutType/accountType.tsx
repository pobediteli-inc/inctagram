"use client";

import React from "react";
import { Card, RadioGroup, Typography } from "common/components";
import s from "./accountType.module.css";
import { BusinessAccount } from "./businessAccount/businessAccount";
import { accountPlan } from "common/constants/paymentConstants";
import { AccountPlanProps } from "common/types";

export const AccountType = ({ hasActiveSubscription }: Props) => {
  const defaultAccountType: AccountPlanProps = hasActiveSubscription ? "Business" : "Personal";

  const [accountType, setAccountType] = React.useState<AccountPlanProps>(defaultAccountType);

  const handleAccount = (value: string) => {
    if (value === "Business" || value === "Personal") setAccountType(value);
  };

  return (
    <div className={s.accountTypeWrapper}>
      <Typography variant={"h3"} color={"light"}>
        Account type:
      </Typography>
      <Card className={s.accountCard}>
        <RadioGroup
          className={s.radioGroup}
          labelClassName={s.label}
          value={accountType}
          onValueChange={handleAccount}
          options={accountPlan}
          disabled={hasActiveSubscription}
        />
      </Card>
      {defaultAccountType === "Business" && <BusinessAccount />}
    </div>
  );
};

type Props = {
  hasActiveSubscription: boolean;
};
