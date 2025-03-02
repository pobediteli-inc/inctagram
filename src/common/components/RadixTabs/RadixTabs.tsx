import * as Tabs from "@radix-ui/react-tabs"
import s from "./RadixTabs.module.css"
import clsx from "clsx"
import { Typography } from "../typography/typography"


export type Props = {
    variant: "primary" | "secondary"
    value: string
    title: string
    disabled?: boolean
}

export const RadixTabs = ({ variant, value, title, disabled = false }: Props) => {
  return (
      <Typography variant={'h3'} asChild color={variant === 'primary' ? 'lightBlue' : 'disabled'} textAlign={'center'}>
        <Tabs.Trigger value={value} className={clsx(s.tabs, s[variant])} disabled={disabled}>{title}</Tabs.Trigger>
      </Typography>
  )
}
