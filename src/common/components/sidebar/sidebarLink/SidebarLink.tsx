import s from "./SidebarLink.module.css";
import Link from "next/link";
import { Typography } from "../../typography/typography";
import { ReactNode } from "react";
import { clsx } from "clsx";

type SidebarLinkProps = {
  item: SidebarItem;
};

export const SidebarLink = ({ item }: SidebarLinkProps) => {
  return (
    <Link className={clsx(s.navbarLink, item.disabled && s.disabled)} href={item.href}>
      {item.icon}
      <Typography variant={"medium_14"}>{item.title}</Typography>
    </Link>
  );
};

export type SidebarItem = {
  href: string;
  icon: ReactNode;
  title: string;
  disabled?: boolean;
};
