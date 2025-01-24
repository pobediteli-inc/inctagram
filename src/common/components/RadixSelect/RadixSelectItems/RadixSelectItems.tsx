import { FC, ReactNode } from "react";
import { CheckIcon } from "@radix-ui/react-icons";
import * as Select from "@radix-ui/react-select";
import stl from "./RadixSelectItem.module.css";
import { clsx } from "clsx";

type Props = {
  className?: string;
  value: string;
  children?: ReactNode;
};

export const RadixSelectItem: FC<Props> = ({ value, children, className }) => {
  return (
    <Select.Item className={clsx(stl.Item, className)} value={value}>
      <Select.ItemText>{children}</Select.ItemText>
      <Select.ItemIndicator className={stl.ItemIndicator}>
        <CheckIcon />
      </Select.ItemIndicator>
    </Select.Item>
  );
};
