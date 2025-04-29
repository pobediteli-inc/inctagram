"use client";

import { FieldValues, useController, UseControllerProps } from "react-hook-form";
import { useEffect, useRef } from "react";
import { Textarea, TextareaProps } from "../textarea/textarea";

type Props<T extends FieldValues> = Omit<TextareaProps, "onChange" | "ref" | "value"> & UseControllerProps<T>;

export const ControlledTextarea = <T extends FieldValues>({
  control,
  defaultValue,
  disabled,
  name,
  rules,
  shouldUnregister,
  autoFocus = true,
  ...textareaProps
}: Props<T>) => {
  const {
    field: { onChange, value = "", ref, ...field },
    fieldState: { error },
  } = useController({ control, defaultValue, disabled, name, rules, shouldUnregister });

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (autoFocus && textareaRef.current) {
      const length = textareaRef.current.value.length;
      textareaRef.current.setSelectionRange(length, length);
      textareaRef.current.focus();
    }
  }, [value, autoFocus]);

  return (
    <Textarea
      {...textareaProps}
      error={error?.message}
      value={value}
      onChange={onChange}
      ref={(el) => {
        ref(el);
        textareaRef.current = el;
      }}
      {...field}
    />
  );
};
