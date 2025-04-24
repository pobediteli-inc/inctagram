"use client";

import s from "./sidebarLink.module.css";
import Link from "next/link";
import { Typography } from "../../typography/typography";
import { ReactNode } from "react";
import { clsx } from "clsx";
import { usePathname } from "next/navigation";

type SidebarLinkProps = {
  item: SidebarItem;
};

export const SidebarLink = ({ item }: SidebarLinkProps) => {
  const currentPath = usePathname();

  const isActive = () => {
    if (item.href === "/") return currentPath === "/";
    return currentPath.startsWith(item.href);
  };

  return (
    <Link className={clsx(s.navbarLink, item.disabled && s.disabled, isActive() && s.active)} href={item.href}>
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
