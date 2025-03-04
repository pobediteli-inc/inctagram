import s from "./emailSentPopup.module.css";
import { Button, Card, Typography } from "common/components";
import { Close } from "assets/icons";

type Props = {
  close: () => void;
  email: string;
};

export const EmailSentPopup = ({ close, email }: Props) => {
  return (
    <div className={s.popUp}>
      <Card className={s.card}>
        <div className={s.popUpHeader}>
          <Typography variant={"h1"} color={"light"}>
            Email sent
          </Typography>
          <button className={s.closeBtn} onClick={close}>
            <Close width={24} height={24} />
          </button>
        </div>
        <div className={s.popUpMessage}>
          <Typography variant={"regular_16"} color={"light"}>
            We have sent a link to confirm your email to {email}
          </Typography>
          <Button onClick={close}>OK</Button>
        </div>
      </Card>
    </div>
  );
};
