"use client";
import { FC, useEffect } from "react";
import s from "./header.module.css";
import { Select } from "common/components/select/select";
import { Typography } from "common/components/typography/typography";
import { Button } from "common/components/button/button";
import Link from "next/link";
import { FlagRussia, FlagUnitedKingdom } from "assets/icons";
import { SelectItemsProps } from "common/types/SelectItemsProps/SelectItemsProps";
import { LogOut } from "common/components/logOut/logOut";
import { authApi, useMeQuery } from "store/services/auth";
import { useAppSelector } from "common/hooks/useAppSelector";
import { selectIsLoggedIn, setLoggedIn } from "features/auth/authSlice";
import { useAppDispatch } from "common/hooks/useAppDispatch";
import { ProgressBar } from "common/components/progressBar/progressBar";

export const Header: FC = () => {
  const { data, isError, isLoading } = useMeQuery();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const dispatch = useAppDispatch();

  const { email } = data ?? {};

  const selectLanguages: SelectItemsProps[] = [
    { value: "en", label: "English", icon: <FlagUnitedKingdom width={20} height={20} /> },
    { value: "ru", label: "Russian", icon: <FlagRussia width={20} height={20} /> },
  ];

  const handleLogOut = () => {
    localStorage.removeItem("accessToken");
    dispatch(authApi.util.resetApiState());
    dispatch(setLoggedIn({ isLoggedIn: false }));
  };

  useEffect(() => {
    if (data) dispatch(setLoggedIn({ isLoggedIn: true }));
    else if (isError) dispatch(setLoggedIn({ isLoggedIn: false }));
  }, [data, isError, dispatch]);

  return (
    <header className={s.headerWrapper}>
      <div className={s.mainWrapper}>
        <Typography variant={"large"} color={"light"} textAlign={"center"}>
          Inctagram
        </Typography>
        <div className={s.selectButtonsWrapper}>
          <Select defaultValue={"en"} items={selectLanguages} groupLabel={"Languages"} />
          <div className={s.buttonsWrapper}>
            {isLoading ? (
              <>
                <Typography variant={"regular_14"}>Loading...</Typography>
                <ProgressBar className={s.progressBar} />
              </>
            ) : isLoggedIn ? (
              <LogOut onLogOutAction={handleLogOut} email={email ?? null} />
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
