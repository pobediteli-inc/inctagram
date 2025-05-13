"use client";

import s from "./sidebarLink.module.css";
import Link from "next/link";
import { ReactNode } from "react";
import { clsx } from "clsx";
import { usePathname } from "next/navigation";
import { authApi, useMeQuery } from "store/services/api/auth";
import { setLoggedIn } from "store/services/slices";
import { Typography } from "../../typography/typography";
import { useAppDispatch } from "common/hooks";
import { LogOut } from "../../logOut/logOut";

type SidebarLinkProps = {
  item: SidebarItem;
};

export const SidebarLink = ({ item }: SidebarLinkProps) => {
  const { data } = useMeQuery();
  const currentPath = usePathname();
  const dispatch = useAppDispatch();

  const isActive = () => {
    if (item.href === "/") return currentPath === "/";
    return currentPath.startsWith(item.href);
  };
  if (item.href === "/logout") {
    const handleLogOut = () => {
      localStorage.removeItem("accessToken");
      dispatch(authApi.util.resetApiState());
      dispatch(setLoggedIn({ isLoggedIn: false }));
    };

    return (
      <LogOut
        className={clsx(s.navbarLink, item.disabled && s.disabled)}
        isLogout
        onLogOutAction={handleLogOut}
        email={data?.email ?? null}
      />
    );
  }

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
