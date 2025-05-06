import { ReactNode } from "react";
import { Close } from "assets/icons";
import s from "./alert.module.css";
import { clsx } from "clsx";
import { Typography } from "../typography/typography";

type AlertProps = {
  children: ReactNode;
  variant?: "success" | "danger";
  onClose?: () => void;
};

// TODO: use <Card /> instead of <div/> when its implemented

export const Alert = ({ children, variant = "success", onClose }: AlertProps) => {
  return (
    <div className={clsx(s.alert, s[variant])}>
      <Typography variant={variant === "danger" ? "bold_16" : "regular_16"}>{children}</Typography>
      <Close className={s.icon} width={24} height={24} onClick={onClose} />
    </div>
  );
};
