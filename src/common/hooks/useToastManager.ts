import { useState } from "react";

export const useToastManager = () => {
  const [toast, setToast] = useState<{
    type: "success" | "error" | "warning";
    message: string;
    open: boolean;
  } | null>(null);

  const showToast = (type: "success" | "error" | "warning", message: string) => {
    setToast({ type, message, open: true });
  };

  const closeToast = () => {
    setToast((prev) => (prev ? { ...prev, open: false } : null));
  };

  return { toast, showToast, closeToast };
};
