"use client";
import { FC, useEffect, useState } from "react";
import s from "./header.module.css";
import { Select } from "common/components/select/select";
import { Typography } from "common/components/typography/typography";
import { Button } from "common/components/button/button";
import Link from "next/link";
import { FlagRussia, FlagUnitedKingdom } from "assets/icons";
import { SelectItemsProps } from "common/types/SelectItemsProps/SelectItemsProps";
import { LogOut } from "common/components/logOut/logOut";
import { useMeQuery } from "store/services/auth";
import { NullableProps } from "common/types";

export const Header: FC = () => {
  const token = localStorage.getItem("accessToken");
  const [isAuthenticated, setIsAuthenticated] = useState<NullableProps<boolean>>(!!token);
  const [accessToken, setAccessToken] = useState<NullableProps<string>>(token);
  const { data, refetch } = useMeQuery(undefined, { skip: !accessToken });
  useEffect(() => {
    const handleStorage = () => {
      const token = localStorage.getItem("accessToken");
      setIsAuthenticated(!!token);
      setAccessToken(token);
      if (accessToken) refetch();
    };
    handleStorage();
    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, [refetch]);

  const selectLanguages: SelectItemsProps[] = [
    { value: "en", label: "English", icon: <FlagUnitedKingdom width={20} height={20} /> },
    { value: "ru", label: "Russian", icon: <FlagRussia width={20} height={20} /> },
  ];

  const handleLogOut = () => {
    localStorage.removeItem("accessToken");
    setIsAuthenticated(false);
    setAccessToken(null);
  };

  return (
    <header className={s.headerWrapper}>
      <div className={s.mainWrapper}>
        <Typography variant={"large"} color={"light"} textAlign={"center"}>
          Inctagram
        </Typography>
        <div className={s.selectButtonsWrapper}>
          <Select defaultValue={"en"} items={selectLanguages} groupLabel={"Languages"} />
          <div className={s.buttonsWrapper}>
            {isAuthenticated ? (
              <LogOut onLogOutAction={handleLogOut} email={data?.email ?? null} />
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
