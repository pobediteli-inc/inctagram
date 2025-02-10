import { FC } from "react";
import s from "./header.module.css";
import { Select } from "common/components/select/select";
import { Typography } from "common/components/typography/typography";
import { Button } from "common/components/button/button";
import Link from "next/link";

type Props = {
  isAuth: boolean;
};

export const Header: FC<Props> = ({ isAuth }) => {
  return (
    <header className={s.headerWrapper}>
      <div className={s.mainWrapper}>
        <Typography variant={"large"} color={"light"} textAlign={"center"}>
          Inctagram
        </Typography>
        <div className={s.selectButtonsWrapper}>
          <Select ariaLabel={"select language"} />
          <div className={s.buttonsWrapper}>
            {isAuth ? (
              <Button variant={"primary"}>Log out</Button>
            ) : (
              <>
                <Button variant={"link"} asChild>
                  <Link href={"/login"}>
                    <Typography variant={"h3"}>Log in</Typography>
                  </Link>
                </Button>
                <Button variant={"primary"}>
                  <Typography variant={"h3"}>Sign Up</Typography>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
