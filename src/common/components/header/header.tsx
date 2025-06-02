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
import { authApi, useMeQuery } from "store/services/api/auth";
import { useAppSelector } from "common/hooks/useAppSelector";
import { selectIsLoggedIn, setLoggedIn } from "store/services/slices/authSlice";
import { useAppDispatch } from "common/hooks/useAppDispatch";
import { handleErrors } from "common/utils/handleErrors";
import { usePathname, useRouter } from "next/navigation";
import { ROUTES } from "../../constants/routes";
import { useGetNotificationsByProfileQuery } from "store/services/api/notifications";
import { useSocketNotifications } from "common/hooks/useSocketNotifications";
import { NotificationDropdown } from "common/components";

export const Header: FC = () => {
  const { data, isLoading } = useMeQuery();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const { data: notificationsData } = useGetNotificationsByProfileQuery(
    { pageSize: 50, sortDirection: "desc" },
    { skip: !isLoggedIn }
  );

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

  const handleOnMainPage = () => router.push(ROUTES.home);

  useEffect(() => {
    try {
      if (data) dispatch(setLoggedIn({ isLoggedIn: true }));
    } catch (error: unknown) {
      handleErrors(error, dispatch);
      dispatch(setLoggedIn({ isLoggedIn: false }));
    }
  }, [data, isLoggedIn, dispatch]);

  useSocketNotifications();

  return (
    <header className={s.headerWrapper}>
      <div className={s.mainWrapper}>
        <Typography
          style={{ cursor: "pointer" }}
          variant={"large"}
          color={"light"}
          textAlign={"center"}
          onClick={handleOnMainPage}
        >
          Inctagram
        </Typography>

        <div className={s.bellAndButtonsWrapper}>
          {isLoggedIn && <NotificationDropdown initialNotifications={notificationsData?.items || []} />}

          <div className={s.selectButtonsWrapper}>
            <Select defaultValue={"en"} items={selectLanguages} groupLabel={"Languages"} />
            <div className={s.buttonsWrapper}>
              {isLoading ? (
                <>
                  <Typography variant={"regular_14"}>Loading...</Typography>
                </>
              ) : isLoggedIn ? (
                <LogOut onLogOutAction={handleLogOut} email={email ?? null} />
              ) : !isLoggedIn && (pathname === ROUTES.login || pathname === ROUTES.auth) ? (
                <></>
              ) : (
                <>
                  <Button variant={"link"} asChild>
                    <Link href={ROUTES.login}>Log in</Link>
                  </Button>
                  <Button variant={"primary"} asChild>
                    <Link href={ROUTES.auth}>Sign up</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
