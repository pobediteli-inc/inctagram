import { FC, ReactNode } from "react";
import stl from "./Header.module.css";
import { RadixSelect } from "common/components/RadixSelect/RadixSelect";
import FillBell from "common/components/SVGComponents/FillBell";

type Props = {
  children?: ReactNode;
};

export const Header: FC<Props> = ({children}) => {
  return (
    <header className={stl.headerWrapper}>
      <div className={stl.logo}>Inctagram</div>
      <div className={stl.language}>
        <div className={stl.bell}>
          <FillBell width={24} height={24}/>
        </div>
        <div className={stl.selectLanguage}>
          <RadixSelect ariaLabel={"select language"} />
        </div>
      </div>
      {children}
    </header>
  );
};
