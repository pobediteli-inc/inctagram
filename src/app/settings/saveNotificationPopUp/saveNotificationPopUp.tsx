"use client";

import { useEffect, useState } from "react";
import s from "./saveNotificationPopUp.module.css";
import { Button, Card, Typography } from "common/components";
import { Close } from "assets/icons";
import { Toast } from "common/components/toast/toast";
import { useRouter } from "next/navigation";

type Props = {
  success: boolean;
};

export const SaveNotificationPopUp = ({ success }: Props) => {
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
    open: boolean;
  } | null>(null);

  const router = useRouter();

  const handleClosePopUp = () => {
    router.push("/settings");
  };

  const handleOkClick = () => {
    handleClosePopUp();
  };

  useEffect(() => {
    const toastData: {
      type: "success" | "error";
      message: string;
      open: boolean;
    } = {
      type: success ? "success" : "error",
      message: success ? "Your settings are saved!" : "Error! Server is not available!",
      open: true,
    };

    setToast(toastData);

    const timer = setTimeout(() => {
      setToast((prev) => (prev ? { ...prev, open: false } : null)); // Закрытие тоста через 3 секунды
    }, 3000);

    return () => clearTimeout(timer);
  }, [success]);

  return (
    <div className={s.popUp}>
      <Card className={s.card}>
        <div className={s.popUpHeader}>
          <Typography variant="h1" color="light">
            Save Changes
          </Typography>
          <Button
            type="button"
            variant="link"
            onClick={handleClosePopUp}
            style={{ color: "var(--light-100)", display: "contents" }}
          >
            <Close width={24} height={24} />
          </Button>
        </div>

        <div className={s.popUpMessage}>
          <Typography variant="regular_16" color="light">
            {success ? "Your settings are saved!" : "Error! Server is not available!"}
          </Typography>

          <Button type="button" onClick={handleOkClick}>
            {" "}
            {/* Закрытие попапа при нажатии на OK */}
            OK
          </Button>
        </div>
      </Card>

      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          open={toast.open}
          setOpen={(open) => setToast((prev) => (prev ? { ...prev, open } : null))}
        />
      )}
    </div>
  );
};
