import s from "./page.module.css";
import PublicPage from "app/publicPage/page";

export default function Home() {
  return (
    <div className={s.home}>
      <PublicPage />
    </div>
  );
}
