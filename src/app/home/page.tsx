import s from "./page.module.css";
import { Sidebar } from "../../common/components";

export default function Home() {
  return (
    <div className={s.wrapper}>
      <Sidebar/>
      <div className={s.home}>
        Home
      </div>
    </div>
  );
}
