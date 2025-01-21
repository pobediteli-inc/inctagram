import { FC, ReactNode } from "react";
import stl from "./Header.module.css";
import { RadixSelect } from "common/components/RadixSelect/RadixSelect";
import OutlineBell from "common/components/SVGComponents/OutlineBell";

type Props = {
  children?: ReactNode;
};

export const Header: FC<Props> = ({children}) => {
  return (
    <header className={stl.headerWrapper}>
      <div className={stl.logo}>Inctagram</div>
      <div className={stl.language}>
        <div className={stl.bell}>
          <OutlineBell width={24} height={24}/>
        </div>
        <div className={stl.selectLanguage}>
          <RadixSelect />
        </div>
      </div>
      {children}
    </header>
  );
};
