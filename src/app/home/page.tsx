import Navbar from "../navbar/Navbar";
import styles from "./page.module.css";
import Header from "../header/Header";

export default function Home() {
  return (
    <div className={styles.home}>
      <Header />
      <div className={styles.homeWrapper}>
        <Navbar />
        <div className={styles.postField}>
          POST
        </div>
      </div>
    </div>
  );
}