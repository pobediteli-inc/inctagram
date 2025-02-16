import s from "./page.module.css";
import SignUp from "app/signUp/page";

export default function Home() {
  return (
    <div>
      <main className={s.main}>
        <SignUp />
      </main>
      <footer className={s.footer}></footer>
    </div>
  );
}
