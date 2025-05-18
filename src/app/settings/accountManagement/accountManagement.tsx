"use client";

import { useState } from "react";
import { AccountType } from "./accoutType/accountType";

export const AccountManagement = () => {
  const [activeModal, setActiveModal] = useState<ModalPayment>(null);

  return (
    <div>
      <AccountType />
    </div>
  );
};

type ModalPayment = "success" | "error" | "create" | null;
