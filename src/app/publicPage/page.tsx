import s from "./publicPage.module.css";
import { TotalUsersCount } from "app/publicPage/totalUsersCount/totalUsersCount";
import { UserPublicProfile } from "app/publicPage/userPublicProfile/userPublicProfile";

export default function PublicPage() {
  return (
    <div className={s.mainWrapper}>
      <TotalUsersCount />
      <UserPublicProfile />
    </div>
  );
}
