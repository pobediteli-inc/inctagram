import * as Tabs from "@radix-ui/react-tabs"
import s from "./RadixTabs.module.css"
import clsx from "clsx"

export type Props = {
    variant: "primary" | "secondary"
    value: string
    title: string
    disabled?: boolean
}

export const RadixTabs = ({ variant, value, title, disabled = false }: Props) => {
  return (
      <Tabs.Trigger value={value} className={clsx(s.tabsBaseStyle, s[variant])} disabled={disabled}>{title}</Tabs.Trigger>
  )
}