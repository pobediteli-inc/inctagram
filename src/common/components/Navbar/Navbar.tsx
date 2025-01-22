import Link from "next/link";
import styles from "./Navbar.module.css";
import Home from "../SVGComponents/Home";
import PlusSquareOutline from "../SVGComponents/PlusSquareOutline";
import Person from "../SVGComponents/Person";
import MessageCircleOutline from "../SVGComponents/MessageCircleOutline";
import SearchOutline from "../SVGComponents/SearchOutline";
import TrendingUpOutline from "../SVGComponents/TrendingUpOutline";
import BookmarkOutline from "../SVGComponents/BookmarkOutline";
import LogOutOutline from "../SVGComponents/LogOutOutline";

export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <div className={styles.navbarLink}>
        <Home width={24} height={24} />
        <div><Link href={"/home"} className={styles.link}>Home</Link></div>
      </div>

      <div className={styles.navbarLink}>
        <PlusSquareOutline width={24} height={24} />
        <div><Link href={"/create"} className={styles.link}>Create</Link></div>
      </div>

      <div className={styles.navbarLink}>
        <Person width={24} height={24} />
        <div><Link href={"/my-profile"} className={styles.link}>My Profile</Link></div>
      </div>

      <div className={styles.navbarLink}>
        <MessageCircleOutline width={24} height={24} />
        <div><Link href={"/messenger"} className={styles.link}>Messenger</Link></div>
      </div>

      <div className={styles.navbarLink}>
        <SearchOutline width={24} height={24} />
        <div><Link href={"/search"} className={styles.link}>Search</Link></div>
      </div>

      <div className={styles.navbarLink}>
        <TrendingUpOutline width={24} height={24} />
        <div><Link href={"/statistic"} className={styles.link}>Statistic</Link></div>
      </div>

      <div className={styles.navbarLink}>
        <BookmarkOutline width={24} height={24} />
        <div><Link href={"/favorites"} className={styles.link}>Favorites</Link></div>
      </div>

      <div className={styles.navbarLink}>
        <LogOutOutline width={24} height={24} />
        <div><Link href={"/logout"} className={styles.link}>Log Out</Link></div>

      </div>
    </div>
  );
}