"use client";

import { ChangeEvent, forwardRef, TextareaHTMLAttributes, useEffect, useState } from "react";
import clsx from "clsx";
import s from "./textarea.module.css";
import { Typography } from "../typography/typography";

export type TextareaProps = {
  title: string;
  error?: string;
  disabled?: boolean;
  maxLength?: number;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ title, error, disabled, maxLength, className, value = "", onChange, ...props }, ref) => {
    const [text, setText] = useState(value.toString());

    useEffect(() => {
      setText(value.toString());
    }, [value]);

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      const newText = e.target.value;
      setText(newText);
      onChange?.(e);
    };

    return (
      <div className={s.container}>
        <Typography variant={"regular_14"}>
          <label className={disabled ? s.disabledLabel : s.label}>{title}</label>
        </Typography>
        <Typography asChild variant={"regular_16"} color={error ? "light" : "dark"}>
          <textarea
            ref={ref}
            disabled={disabled}
            className={clsx(s.textarea, error && s.error, className)}
            value={text}
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
  }
);
