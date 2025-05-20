"use client";

import { useAppDispatch } from "common/hooks";
import { handleErrors } from "common/utils";
import { useCreatePaymentMutation } from "store/services/api/payments";
import { BusinessAccountProps, ModalPaymentProps, ProviderProps } from "common/types";

const typeSubscription = {
  DAY: "DAY",
  WEEKLY: "WEEKLY",
  MONTHLY: "MONTHLY",
} as const;

export const usePayment = () => {
  const [createPayment, { isLoading }] = useCreatePaymentMutation();
  const dispatch = useAppDispatch();

  const handlePayment = async (
    accountPlan: BusinessAccountProps,
    provider: ProviderProps
  ): Promise<Exclude<ModalPaymentProps, "create" | null>> => {
    try {
      const response = await createPayment({
        typeSubscription: typeSubscription[accountPlan],
        paymentType: provider,
        amount: 0,
        baseUrl: `${window.location.origin}/settings`,
      }).unwrap();

      if (response?.url) {
        window.location.href = response.url;
        return "success";
      } else {
        return "error";
      }
    } catch (error: unknown) {
      handleErrors(error, dispatch);
      return "error";
    }
  };

  return { handlePayment, isLoading };
};
