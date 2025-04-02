import { ChangeEvent, TextareaHTMLAttributes, useState } from "react";
import clsx from "clsx";
import s from "./textarea.module.css";
import { Typography } from "../typography/typography";

type Props = {
  title: string;
  error?: string;
  disabled?: boolean;
  maxLength?: number;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = ({ title, error, disabled, maxLength, className, ...props }: Props) => {
  const [text, setText] = useState(props.value?.toString() || "");

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    props.onChange?.(e);
  };

  return (
    <div className={s.container}>
      <Typography variant={"regular_14"}>
        <label className={disabled ? s.disabledLabel : s.label}>{title}</label>
      </Typography>
      <Typography asChild variant={"regular_16"} color={error ? "light" : "dark"}>
        <textarea
          disabled={disabled}
          className={clsx(s.textarea, error && s.error, className)}
          onChange={handleChange}
          {...props}
        />
      </Typography>
      {maxLength && (
        <Typography variant={"small"} color={text.length > maxLength ? "error" : "dark"} className={s.charCounter}>
          {text.length}/{maxLength}
        </Typography>
      )}

      <Typography variant={"regular_14"} color={"error"}>
        {error && <p>{error}</p>}
      </Typography>
    </div>
  );
};
