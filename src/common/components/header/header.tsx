import { FC } from "react";
import s from "./header.module.css";
import { Select } from "common/components/select/select";
import { Typography } from "common/components/typography/typography";
import { Button } from "common/components/button/button";
import Link from "next/link";
import { FlagRussia, FlagUnitedKingdom } from "assets/icons";
import { SelectItemsProps } from "common/types/SelectItemsProps/SelectItemsProps";

type Props = {
  isAuth: boolean;
};

export const Header: FC<Props> = ({ isAuth }) => {
  const selectLanguages: SelectItemsProps[] = [
    { value: "en", label: "English", icon: <FlagUnitedKingdom width={20} height={20} /> },
    { value: "ru", label: "Russian", icon: <FlagRussia width={20} height={20} /> },
  ];

  return (
    <header className={s.headerWrapper}>
      <div className={s.mainWrapper}>
        <Typography variant={"large"} color={"light"} textAlign={"center"}>
          Inctagram
        </Typography>
        <div className={s.selectButtonsWrapper}>
          <Select defaultValue={"en"} items={selectLanguages} groupLabel={"Languages"} />
          <div className={s.buttonsWrapper}>
            {isAuth ? (
              <Button variant={"primary"}>Log out</Button>
            ) : (
              <>
                <Button variant={"link"} asChild>
                  <Link href={"/login"}>Log in</Link>
                </Button>
                <Button variant={"primary"} asChild>
                  <Link href={"/auth"}>Sign up</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
