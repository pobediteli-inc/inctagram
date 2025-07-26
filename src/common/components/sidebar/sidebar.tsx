"use client";

import s from "./sidebar.module.css";
import {
  BookmarkOutline,
  Home,
  LogOutOutline,
  MessageCircleOutline,
  Person,
  PlusSquareOutline,
  SearchOutline,
  TrendingUpOutline,
} from "assets/icons";
import { SidebarItem, SidebarLink } from "./sidebarLink/sidebarLink";
import { useMeQuery } from "store/services/api/auth";
import { ROUTES } from "../../constants/routes";

const sidebarItems: SidebarItem[] = [
  {
    href: ROUTES.feed,
    icon: <Home width={24} height={24} />,
    title: "Feed",
  },
  {
    href: ROUTES.create,
    icon: <PlusSquareOutline width={24} height={24} />,
    title: "Create",
  },
  {
    href: "/myProfile",
    icon: <Person width={24} height={24} />,
    title: "My Profile",
  },
  {
    href: ROUTES.messenger,
    icon: <MessageCircleOutline width={24} height={24} />,
    title: "Messenger",
  },
  {
    href: ROUTES.search,
    icon: <SearchOutline width={24} height={24} />,
    title: "Search",
  },
  {
    href: ROUTES.statistic,
    icon: <TrendingUpOutline width={24} height={24} />,
    title: "Statistic",
  },
  {
    href: ROUTES.favorites,
    icon: <BookmarkOutline width={24} height={24} />,
    title: "Favorites",
  },
  {
    href: ROUTES.logout,
    icon: <LogOutOutline width={24} height={24} />,
    title: "Log Out",
  },
];

export const Sidebar = () => {
  const { data } = useMeQuery();

  if (!data?.userId) return null;

  const dynamicSidebarItems = sidebarItems.map((item) =>
    item.title === "My Profile" ? { ...item, href: ROUTES.myProfile(data?.userId) } : item
  );

  return (
    <nav className={s.navbar}>
      {dynamicSidebarItems.map((i, index) => (
        <SidebarLink item={i} key={index} />
      ))}
    </nav>
  );
};
