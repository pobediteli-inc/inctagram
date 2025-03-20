"use client";
import { LogOutOutline } from "../../../assets/icons";
import { FC, useState } from "react";
import { LogOutModal } from "../modal/logOutModal/logOutModal";
import s from "./logOut.module.scss";
import { Typography } from "../typography/typography";
import { NullableProps } from "common/types";
import { useLogOutMutation } from "store/services/auth";
import { useRouter } from "next/navigation";
import { Button } from "common/components/button/button";

export const LogOut: FC<LogOutProps> = ({ onLogOutAction, email }) => {
  const [showModal, setShowModal] = useState(false);
  const [logOut] = useLogOutMutation();
  const router = useRouter();

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      await logOut().unwrap();
      onLogOutAction();
      toggleModal();
      router.push("/login");
    } catch (error: unknown) {
      const serverError = error as NullableProps<string>;
      console.log(serverError || "An error occurred. Token is either missing or expired.");
    }
  };

  return (
    <div>
      <Button className={s.container} onClick={toggleModal}>
        <LogOutOutline width={24} height={24} color={"var(--light-100)"} className={s.icon} />
        <Typography variant={"medium_14"} color={"light"}>
          Log Out
        </Typography>
      </Button>

      {showModal && <LogOutModal isOpen={showModal} onClose={toggleModal} email={email} onLogout={handleLogout} />}
    </div>
  );
};

type LogOutProps = {
  onLogOutAction: () => void;
  email: NullableProps<string>;
};
