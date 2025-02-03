import { TextareaHTMLAttributes } from "react"
import clsx from "clsx"
import s from "./Textarea.module.css"

type Props = {
    title: string
    error?: string
    disabled?: boolean
  } & TextareaHTMLAttributes<HTMLTextAreaElement>

export const Textarea = ({ title, error, disabled, className, ...props }: Props) => {
  return (
    <div className={s.container}>
      <label className={disabled ? s.disabledLabel : s.label} >{title}</label>
      <textarea
        disabled={disabled}
        className={clsx(s.textarea, error && s.error, className)}
        {...props}
      />
      {error && <p className={s.errorText}>{error}</p>}
    </div>
  )
}
