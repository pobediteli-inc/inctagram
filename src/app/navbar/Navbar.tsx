import Link from "next/link";
import styles from "./Navbar.module.css";
import Image from "next/image";

export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <div className={styles.navbarLink}>
        <div>
          <Image src="/homepicked.png"
                 alt={"home"} width={24}
                 height={24}
                 className={styles.img}/>
        </div>
        <div>
          <Link href={"/home"} className={styles.link}>Home</Link>
        </div>
      </div>

      <div className={styles.navbarLink}>
        <div>
          <Image src="/plus-square-outline.png"
                 alt={"create"}
                 width={24}
                 height={24}
                 className={styles.img}/>
        </div>
        <div>
          <Link href={"/create"} className={styles.link}>Create</Link>
        </div>
      </div>

      <div className={styles.navbarLink}>
        <div>
          <Image src="/myprofile.png"
                 alt={"my profile"}
                 width={24}
                 height={24}
                 className={styles.img}/>
        </div>
        <div>
          <Link href={"/myprofile"} className={styles.link}>My Profile</Link>
        </div>
      </div>

      <div className={styles.navbarLink}>
        <div>
          <Image src="/messenger.png"
                 alt={"messenger"}
                 width={24}
                 height={24}
                 className={styles.img}/>
        </div>
        <div>
          <Link href={"/messenger"} className={styles.link}>Messenger</Link>
        </div>
      </div>

      <div className={styles.navbarLinkSearch}>
        <div>
          <Image src="/search.png"
                 alt={"search"}
                 width={24}
                 height={24}
                 className={styles.img}/>
        </div>
        <div>
          <Link href={"/search"} className={styles.link}>Search</Link>
        </div>
      </div>

      <div className={styles.navbarLink}>
        <div>
          <Image src="/statistic.png"
                 alt={"statistic"}
                 width={24}
                 height={24}
                 className={styles.img}/>
        </div>
        <div>
          <Link href={"/statistic"} className={styles.link}>Statistic</Link>
        </div>
      </div>

      <div className={styles.navbarLink}>
        <div><Image src="/favorites.png"
                    alt={"favorites"}
                    width={24}
                    height={24}
                    className={styles.img}/></div>
        <div><Link href={"/favorites"} className={styles.link}>Favorites</Link></div>
      </div>

      <div className={styles.navbarLink}>
        <div>
          <Image src="/logout.png"
                 alt={"logout"}
                 width={24}
                 height={24}
                 className={styles.img}/>
        </div>
        <div>
          <Link href={"/logout"} className={styles.link}>Log Out</Link>
        </div>

      </div>
    </div>
  );
}