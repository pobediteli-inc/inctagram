import { FC, ReactNode } from "react";
import { CheckIcon } from "@radix-ui/react-icons";
import * as RadixSelect from "@radix-ui/react-select";
import stl from "./selectItem.module.css";
import { clsx } from "clsx";

type Props = {
  className?: string;
  value: string;
  children?: ReactNode;
};

export const SelectItem: FC<Props> = ({ value, children, className }) => {
  return (
    <RadixSelect.Item className={clsx(stl.Item, className)} value={value}>
      <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
      <RadixSelect.ItemIndicator className={stl.ItemIndicator}>
        <CheckIcon />
      </RadixSelect.ItemIndicator>
    </RadixSelect.Item>
  );
};
