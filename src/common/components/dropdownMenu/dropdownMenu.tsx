import { ComponentPropsWithoutRef, ReactNode } from "react";
import * as DropdownMenuRadix from "@radix-ui/react-dropdown-menu";
import s from "./dropdownMenu.module.scss";
import { MoreHorizontalOutline } from "assets/icons";

type Props = {
  children?: ReactNode;
  trigger?: ReactNode;
} & ComponentPropsWithoutRef<typeof DropdownMenuRadix.Root>;

export const DropdownMenu = (props: Props) => {
  const { children, trigger, ...rest } = props;

  return (
    <DropdownMenuRadix.Root {...rest}>
      <DropdownMenuRadix.Trigger asChild className={s.trigger}>
        {trigger || <MoreHorizontalOutline width={24} height={24} />}
      </DropdownMenuRadix.Trigger>
      <DropdownMenuRadix.Portal>
        <DropdownMenuRadix.Content className={s.dropdownContent} align={"end"}>
          {children}
        </DropdownMenuRadix.Content>
      </DropdownMenuRadix.Portal>
    </DropdownMenuRadix.Root>
  );
};
