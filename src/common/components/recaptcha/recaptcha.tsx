"use client";

import ReCAPTCHA from "react-google-recaptcha";
import s from "./recaptcha.module.scss";
import { Typography } from "../typography/typography";

type ReCaptchaPropsType = {
  siteKey: string;
  onVerifyAction: (token: string | null) => void;
  error: boolean;
};

export const ReCaptcha = ({ siteKey, onVerifyAction, error }: ReCaptchaPropsType) => {
  return (
    <div className={error ? s.errorContainer : ""}>
      <ReCAPTCHA sitekey={siteKey} theme={"dark"} className={s.recaptcha} onChange={onVerifyAction} />
      {error ? (
        <Typography asChild={true} variant={"small"} className={s.errorMessage}>
          <p>Please verify that you are not a robot</p>
        </Typography>
      ) : (
        ""
      )}
    </div>
  );
};
