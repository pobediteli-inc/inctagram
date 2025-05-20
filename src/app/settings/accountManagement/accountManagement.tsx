"use client";

import { AccountType } from "./accoutType/accountType";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ModalPaymentProps } from "common/types";
import { PaymentSuccessModal } from "./modalPayments/paymentSuccess";
import { PaymentErrorModal } from "./modalPayments/paymentError";

export const AccountManagement = () => {
  const searchParams = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState<ModalPaymentProps>(null);
  const router = useRouter();
  useEffect(() => {
    if (searchParams.get("success") || searchParams.get("error")) {
      setIsModalOpen(searchParams.get("success") ? "success" : "error");

      router.replace("/settings");
    }
  }, [router, searchParams]);

  const handleClose = () => setIsModalOpen(null);

  return (
    <>
      <AccountType />
      {isModalOpen === "success" && <PaymentSuccessModal onCloseAction={handleClose} open />}
      {isModalOpen === "error" && <PaymentErrorModal onCloseAction={handleClose} open />}
    </>
  );
};
