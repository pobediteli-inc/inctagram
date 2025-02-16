import s from "./sidebar.module.css";
import {
  Home,
  PlusSquareOutline,
  Person,
  MessageCircleOutline,
  SearchOutline,
  TrendingUpOutline,
  BookmarkOutline,
  LogOutOutline,
} from "assets/icons";
import { SidebarItem, SidebarLink } from "./sidebarLink/sidebarLink";

const sidebarItems: SidebarItem[] = [
  {
    href: "/home",
    icon: <Home width={24} height={24} />,
    title: "Home",
  },
  {
    href: "/create",
    icon: <PlusSquareOutline width={24} height={24} />,
    title: "Create",
  },
  {
    href: "/my-profile",
    icon: <Person width={24} height={24} />,
    title: "My Profile",
  },
  {
    href: "/messenger",
    icon: <MessageCircleOutline width={24} height={24} />,
    title: "Messenger",
  },
  {
    href: "/search",
    icon: <SearchOutline width={24} height={24} />,
    title: "Search",
  },
  {
    href: "/statistic",
    icon: <TrendingUpOutline width={24} height={24} />,
    title: "Statistic",
  },
  {
    href: "/favorites",
    icon: <BookmarkOutline width={24} height={24} />,
    title: "Favorites",
  },
  {
    href: "/logout",
    icon: <LogOutOutline width={24} height={24} />,
    title: "Log Out",
  },
];

export const Sidebar = () => {
  return (
    <nav className={s.navbar}>
      {sidebarItems.map((i, index) => (
        <SidebarLink item={i} key={index} />
      ))}
    </nav>
  );
};
