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
  const searchParams = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState<ModalPaymentProps>(null);
  const router = useRouter();
  const { data, isLoading } = useCurrentPaymentSubscriptionsQuery();

  const hasActiveSubscription =
    !!data?.data?.[0]?.endDateOfSubscription && new Date(data.data[0].endDateOfSubscription) > new Date();

  useEffect(() => {
    const isSuccess = searchParams.get("success");
    const isError = searchParams.get("error");

    if ((isSuccess && hasActiveSubscription) || isError) {
      setIsModalOpen(isSuccess ? "success" : "error");

      router.replace("/settings");
    }
  }, [hasActiveSubscription, router, searchParams]);

  const handleClose = () => setIsModalOpen(null);

  if (isLoading) return null;

  return (
    <>
      {isModalOpen === "success" && <PaymentSuccessModal onCloseAction={handleClose} open />}
      {isModalOpen === "error" && <PaymentErrorModal onCloseAction={handleClose} open />}
      {hasActiveSubscription && <CurrentSubscription />}
      <AccountType hasActiveSubscription={hasActiveSubscription} />
    </>
  );
};
