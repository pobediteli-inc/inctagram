import styles from "./page.module.css";
import SignUpPage from "app/signUp/page";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <SignUpPage />
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
