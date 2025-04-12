import { ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import s from "./avatar.module.scss";

type Props = {
  size?: "large" | "small";
} & Omit<ComponentPropsWithoutRef<"img">, "alt">;

export const Avatar = ({ className, size = "small", src, ...rest }: Props) => {
  const classNames = {
    avatar: clsx(s.avatar, s[size], className),
  };

  return <img alt={"avatar"} className={classNames.avatar} src={src ?? "/icons/svg/person.svg"} {...rest} />;
};
