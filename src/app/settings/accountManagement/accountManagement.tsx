"use client";

import { AccountType } from "./accoutType/accountType";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ModalPaymentProps } from "common/types";
import { PaymentSuccessModal } from "./modalPayments/paymentSuccess";
import { PaymentErrorModal } from "./modalPayments/paymentError";
import { CurrentSubscription } from "./accoutType/currentSubscription/currentSubscription";
import { useCurrentPaymentSubscriptionsQuery } from "store/services/api/payments";

export const AccountManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState<ModalPaymentProps>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data, isLoading } = useCurrentPaymentSubscriptionsQuery();

  const isSuccess = searchParams.get("success");
  const isError = searchParams.get("error");
  const hasActiveSubscription =
    !!data?.data?.[0]?.endDateOfSubscription && new Date(data.data[0].endDateOfSubscription) > new Date();

  useEffect(() => {
    if ((isSuccess && hasActiveSubscription) || isError) {
      setIsModalOpen(isSuccess ? "success" : "error");
      router.replace("/settings");
    }
  }, [hasActiveSubscription, isError, isSuccess, router]);

  const handleClose = () => setIsModalOpen(null);

  if (isLoading) return null;

  return (
    <>
      <PaymentSuccessModal onCloseAction={handleClose} open={isModalOpen === "success"} />
      <PaymentErrorModal onCloseAction={handleClose} open={isModalOpen === "error"} />
      {hasActiveSubscription && <CurrentSubscription />}
      <AccountType hasActiveSubscription={hasActiveSubscription} />
    </>
  );
};
