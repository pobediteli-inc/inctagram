import { useState } from "react";
import s from "./closeNotificationPopUp.module.css";
import { Button, Card, Typography } from "common/components";
import { Close } from "assets/icons";
import { Toast } from "common/components/toast/toast";

type Props = {
  close: () => void;
};

export const CloseNotificationPopUp = ({ close }: Props) => {
  const [toast, setToast] = useState<{
    type: "success" | "error" | "warning";
    message: string;
    open: boolean;
  } | null>(null);

  const handleDiscardClick = () => {
    close();
  };

  const handleSaveDraftClick = () => {
    setToast({
      type: "warning",
      message: "Sorry, option is not available",
      open: true,
    });
  };

  return (
    <div className={s.popUp}>
      <Card className={s.card}>
        <div className={s.popUpHeader}>
          <Typography variant={"h1"} color={"light"}>
            Close
          </Typography>
          <Button
            type={"button"}
            variant={"link"}
            onClick={close}
            style={{ color: "var(--light-100)", display: "contents" }}
          >
            <Close width={24} height={24} />
          </Button>
        </div>
        <div className={s.popUpMessage}>
          <Typography variant={"regular_16"} color={"light"}>
            Do you really want to close the addition of a profile photo?
            <br />
            If you close everything will be deleted.
          </Typography>
          <div className={s.btnGroup}>
            <Button onClick={handleDiscardClick} variant={"outlined"}>
              Discard
            </Button>
            <Button onClick={handleSaveDraftClick}>Save draft</Button>
          </div>
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
