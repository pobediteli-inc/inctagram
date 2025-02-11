import s from "./cards.module.css"
import React from "react";

export type Props = React.PropsWithChildren;

export const Cards: React.FC<Props> = ({children}) => {
  return (
    <div className={s.wrapper}>
      <div className={s.card}>
        {children}
      </div>
    </div>
  );
}
