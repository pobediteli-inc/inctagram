import s from "./publicPage.module.css";
import { TotalUsersCount } from "app/publicPage/totalUsersCount/totalUsersCount";
import { PublicProfiles } from "app/publicPage/publicProfiles/publicProfiles";

export default function PublicPage() {
  return (
    <div className={s.mainWrapper}>
      <TotalUsersCount />
      <PublicProfiles />
    </div>
  );
}
