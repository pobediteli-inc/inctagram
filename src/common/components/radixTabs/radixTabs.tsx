import * as Tabs from "@radix-ui/react-tabs";
import s from "./radixTabs.module.css";
import clsx from "clsx";
import { TabsTriggerProps } from "@radix-ui/react-tabs";
import { Typography } from "../typography/typography";
import { forwardRef } from "react";

export type Props = {
  value: string;
  title: string;
  disabled?: boolean;
} & TabsTriggerProps;

export const RadixTabs = forwardRef<HTMLButtonElement, Props>(
  ({ value, title, disabled = false, ...restProps }: Props, ref) => {
    return (
      <Typography variant={"h3"} asChild>
        <Tabs.Trigger value={value} className={clsx(s.tabs)} disabled={disabled} ref={ref} {...restProps}>
          {title}
        </Tabs.Trigger>
      </Typography>
    );
  }
);
