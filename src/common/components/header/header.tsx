import { FC, ReactNode } from "react";
import stl from "./header.module.css";
import { Select } from "common/components/select/select";
import FillBell from "assets/icons/FillBell";

type Props = {
  children?: ReactNode;
};

export const Header: FC<Props> = ({ children }) => {
  return (
    <header className={stl.headerWrapper}>
      <div className={stl.logo}>Inctagram</div>
      <div className={stl.language}>
        <div className={stl.bell}>
          <FillBell width={24} height={24} />
        </div>
        <div className={stl.selectLanguage}>
          <Select ariaLabel={"select language"} />
        </div>
      </div>
      {children}
    </header>
  );
};
