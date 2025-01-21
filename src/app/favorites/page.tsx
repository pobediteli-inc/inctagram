import Navbar from "../navbar/Navbar";
import styles from "./page.module.css";
import Header from "../header/Header";

export default function Favorites() {
  return (
    <div className={styles.favorites}>
      <Header />
      <div className={styles.favoritesWrapper}>
        <Navbar />
        <div className={styles.favoritesField}>
          FAVORITES
        </div>
      </div>
    </div>
  );
}