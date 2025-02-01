import s from "./Sidebar.module.css";
import Home from "../SVGComponents/Home";
import PlusSquareOutline from "../SVGComponents/PlusSquareOutline";
import Person from "../SVGComponents/Person";
import MessageCircleOutline from "../SVGComponents/MessageCircleOutline";
import SearchOutline from "../SVGComponents/SearchOutline";
import TrendingUpOutline from "../SVGComponents/TrendingUpOutline";
import BookmarkOutline from "../SVGComponents/BookmarkOutline";
import LogOutOutline from "../SVGComponents/LogOutOutline";
import { SidebarItem, SidebarLink } from "./SidebarLink/SidebarLink";

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

export default function Sidebar() {
  return (
    <nav className={s.navbar}>
      {sidebarItems.map((i, index) => (
        <SidebarLink item={i} key={index} />
      ))}
    </nav>
  );
}
