import { BaseModal } from "../baseModal/baseModal";
import { Typography } from "../../typography/typography";
import { Button } from "../../button/button";
import s from "./logOutModal.module.scss";
import { NullableProps } from "common/types";
import { FC } from "react";

type LogOutModalProps = {
  isOpen: boolean;
  onClose: () => void;
  email: NullableProps<string>;
  onLogout: () => void;
};

export const LogOutModal: FC<LogOutModalProps> = ({ isOpen, onClose, onLogout, email }) => {
  return (
    <BaseModal open={isOpen} onClose={onClose} modalTitle={"Log Out"} className={s.contentContainer}>
      <div className={s.container}>
        <div className={s.message}>
          <Typography variant={"regular_16"} color={"light"}>
            Do you really want to log out of your account “
            <Typography variant={"bold_14"} asChild>
              <span tabIndex={0} autoFocus className={s.autoFocus}>
                {email}
              </span>
            </Typography>
            ”?
          </Typography>
        </div>
        <div className={s.buttons}>
          <Button variant={"outlined"} className={s.button} onClick={onLogout}>
            <Typography variant={"h3"}>Yes</Typography>
          </Button>
          <Button variant={"primary"} className={s.button} onClick={onClose}>
            <Typography variant={"h3"}>No</Typography>
          </Button>
        </div>
      </div>
    </BaseModal>
  );
};
