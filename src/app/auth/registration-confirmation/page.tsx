"use client";

import s from "./registration-confirmation.module.css";
import { useSearchParams } from "next/navigation";
import { useConfirmRegistrationMutation } from "store/services/api/auth";
import { useCallback, useEffect, useState } from "react";
import Success from "../success/page";
import EmailExpired from "../emailExpired/page";

export default function RegistrationConfirmation() {
  const searchParams = useSearchParams();
  const confirmationCode = searchParams.get("code");
  const email = searchParams.get("email");

  const [confirmRegistration, { isLoading, isSuccess }] = useConfirmRegistrationMutation();
  const [isError, setIsError] = useState(false);

  const handleConfirm = useCallback(async () => {
    if (confirmationCode) {
      try {
        await confirmRegistration({ confirmationCode }).unwrap();
      } catch {
        setIsError(true);
      }
    }
  }, [confirmationCode, confirmRegistration]);

  useEffect(() => {
    handleConfirm();
  }, [handleConfirm]);

  if (!confirmationCode || !email) {
    return <p>Error: Invalid or missing confirmation parameters!</p>;
  }

  if (isLoading) {
    return <p>Confirming registration...</p>;
  }

  if (isSuccess) {
    return <Success />;
  }

  if (isError) {
    return <EmailExpired />;
  }

  return <div className={s.wrapper}></div>;
}
