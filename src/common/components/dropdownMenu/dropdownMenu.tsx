import { ComponentPropsWithoutRef, ReactNode } from "react";
import * as DropdownMenuRadix from "@radix-ui/react-dropdown-menu";
import s from "./dropdownMenu.module.scss";
import { MoreHorizontalOutline } from "assets/icons";
import { clsx } from "clsx";

type Props = {
  children?: ReactNode;
  trigger?: ReactNode;
  className?: string;
} & ComponentPropsWithoutRef<typeof DropdownMenuRadix.Root>;

export const DropdownMenu = (props: Props) => {
  const { children, trigger, ...rest } = props;

  return (
    <DropdownMenuRadix.Root {...rest}>
      <DropdownMenuRadix.Trigger asChild className={clsx(props.className, s.trigger)}>
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
