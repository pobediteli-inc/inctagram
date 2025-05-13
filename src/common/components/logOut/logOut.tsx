"use client";

import { LogOutOutline } from "../../../assets/icons";
import { FC, useState } from "react";
import { LogOutModal } from "../modal/logOutModal/logOutModal";
import s from "./logOut.module.scss";
import { Typography } from "../typography/typography";
import { NullableProps } from "common/types";
import { useLogOutMutation } from "store/services/api/auth";
import { useRouter } from "next/navigation";
import { Button } from "common/components/button/button";
import { handleErrors } from "common/utils/handleErrors";
import { useAppDispatch } from "common/hooks/useAppDispatch";
import { clsx } from "clsx";

export const LogOut: FC<LogOutProps> = ({ className, isLogout, onLogOutAction, email }) => {
  const [showModal, setShowModal] = useState(false);
  const [logOut] = useLogOutMutation();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      await logOut().unwrap();
      onLogOutAction();
      setShowModal(false);
      toggleModal();
      router.push("/");
    } catch (error: unknown) {
      handleErrors(error, dispatch);
    }
  };

  return (
    <div>
      <Button
        variant={isLogout ? "link" : "primary"}
        className={clsx(isLogout && className, s.container)}
        onClick={toggleModal}
      >
        <LogOutOutline width={24} height={24} />
        <Typography variant={"medium_14"}>Log Out</Typography>
      </Button>

      {showModal && <LogOutModal isOpen={showModal} onClose={toggleModal} email={email} onLogout={handleLogout} />}
    </div>
  );
};

type LogOutProps = {
  className?: string;
  isLogout?: boolean;
  onLogOutAction: () => void;
  email: NullableProps<string>;
};
