import s from "./page.module.css";
import { PublicProfiles } from "app/publicPage";

export default function Home() {
  return (
    <div className={s.home}>
      <PublicProfiles />
    </div>
  );
}
