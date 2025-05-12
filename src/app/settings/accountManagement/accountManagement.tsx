import { useState } from "react";
import { PaymentSuccessModal } from "../accountManagement/modalPayments/paymentSuccess";
import { PaymentErrorModal } from "../accountManagement/modalPayments/paymentError";
import { CreatePaymentModal } from "../accountManagement/modalPayments/createPayment";

export const AccountManagement = () => {
  const [isPaymentSuccessModalOpen, setIsPaymentSuccessModalOpen] = useState(false);
  const [isPaymentErrorModalOpen, setIsPaymentErrorModalOpen] = useState(false);
  const [isCreatePaymentModalOpen, setIsCreatePaymentModalOpen] = useState(false);

  return (
    <div>
      <PaymentSuccessModal open={isPaymentSuccessModalOpen} close={() => setIsPaymentSuccessModalOpen(false)} />
      <PaymentErrorModal open={isPaymentErrorModalOpen} close={() => setIsPaymentErrorModalOpen(false)} />
      <CreatePaymentModal open={isCreatePaymentModalOpen} close={() => setIsCreatePaymentModalOpen(false)} />
    </div>
  );
};
