import s from "./card.module.css";
import React, { ComponentPropsWithRef } from "react";
import { clsx } from "clsx";

export type Props = React.PropsWithChildren & ComponentPropsWithRef<"div">;

export const Card: React.FC<Props> = ({ children, className, ...rest }) => {
  return (
    <div className={clsx(s.card, className)} {...rest}>
      {children}
    </div>
  );
};
