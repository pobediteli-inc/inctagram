import { TextareaHTMLAttributes } from "react"
import clsx from "clsx"
import s from "./textarea.module.css"
import { Typography } from "../typography/typography"


type Props = {
    title: string
    error?: string
    disabled?: boolean
  } & TextareaHTMLAttributes<HTMLTextAreaElement>

export const Textarea = ({ title, error, disabled, className, ...props }: Props) => {
  return (
    <div className={s.container}>
      <Typography variant={'regular_14'}>
        <label className={disabled ? s.disabledLabel : s.label} >{title}</label>
      </Typography>
      <Typography asChild variant={'regular_16'} color={error ? 'light' : 'dark'}>
        <textarea
          disabled={disabled}
          className={clsx(s.textarea, error && s.error, className)}
          {...props}
        />
      </Typography>
      
      <Typography variant={'regular_14'} color={'error'}>{error && <p>{error}</p>}</Typography>
    </div>
  )
}

