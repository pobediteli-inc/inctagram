"use client";

import ReCAPTCHA from "react-google-recaptcha";
import s from "./recaptcha.module.scss";

type ReCaptchaPropsType = {
  sitekey: string;
  onVerify: (token: string | null) => void;
  error: boolean;
};

const ReCaptcha = ({ sitekey, onVerify, error }: ReCaptchaPropsType) => {
  return (
    <div className={error ? s.errorContainer : ""}>
      <ReCAPTCHA sitekey={sitekey} theme={"dark"} className={s.recaptcha} onChange={onVerify} />
      {error ? <p className={s.errorMessage}>Please verify that you are not a robot</p> : ""}
    </div>
  );
};

export default ReCaptcha;
