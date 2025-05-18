"use client";

import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { RadioOptionProps } from "common/types";
import { Card, ControlledRadioGroup, Typography } from "common/components";
import s from "./accountType.module.css";
import { BusinessAccount } from "./businessAccount/businessAccount";

export const AccountType = () => {
  const { control } = useForm({
    defaultValues: {
      accountType: "Personal" as Props,
    },
  });
  const accountType = useWatch({
    control,
    name: "accountType",
    defaultValue: "Personal",
  });

  const account: RadioOptionProps[] = [
    { value: "Personal", label: "Personal" },
    { value: "Business", label: "Business" },
  ];

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
          options={account}
        />
      </Card>
      {accountType === "Business" && <BusinessAccount />}
    </div>
  );
};

type Props = "Personal" | "Business";
