"use client";

import { LogOutOutline } from "../../../assets/icons";
import { useState } from "react";
import { LogOutModal } from "../modal/logOutModal/logOutModal";
import s from "./logOut.module.scss";
import { Typography } from "../typography/typography";
import { useLogoutMutation } from "../../../store/services/auth";
import { useRouter } from "next/navigation";

export const LogOut = () => {
  const [showModal, setShowModal] = useState(false);
  const [logout] = useLogoutMutation();
  const router = useRouter();

  const account = "Epam@epam.com";

  const toggleModal = () => setShowModal((prev) => !prev);

  const logOutHandler = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <div>
      <div className={s.container} onClick={toggleModal} aria-label="Log out">
        <LogOutOutline width={24} height={24} color={"var(--light-100)"} className={s.icon} />
        <Typography variant={"medium_14"} color={"light"}>
          Log Out
        </Typography>
      </div>
      <LogOutModal isOpen={showModal} onClose={toggleModal} email={account} onLogout={logOutHandler} />
    </div>
  );
};
