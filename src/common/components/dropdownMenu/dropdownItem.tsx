import { ComponentPropsWithoutRef } from "react";
import * as DropdownMenuRadix from "@radix-ui/react-dropdown-menu";
import clsx from "clsx";
import s from "./dropdownMenu.module.scss";

type Props = ComponentPropsWithoutRef<typeof DropdownMenuRadix.Item>;

export const DropdownItem = ({ className, ...props }: Props) => {
  return (
    <DropdownMenuRadix.Item className={clsx(className, s.dropdownItem, props.disabled && s.disabled)} {...props} />
  );
};
