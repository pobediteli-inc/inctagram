import React, { type ComponentPropsWithRef, FC } from "react";
import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import stl from "./RadixCheckbox.module.css";
import { clsx } from "clsx";

export const RadixCheckbox: FC<RadixCheckbox> = ({
  containerClassName,
  labelClassName,
  label,
  labelPosition = "right",
  checked = false,
  setChecked,
  disabled = false,
  ...rest
}) => {
  const handleChecked = (checked: boolean) => setChecked(checked);

  return (
    <div className={clsx(stl.checkContainer, stl[`label-${labelPosition}`], containerClassName)}>
      {label && (
        <label
          htmlFor={rest.name}
          className={clsx(stl.label, { [stl.labelDisabled]: disabled }, labelClassName)}
          aria-disabled={disabled}
        >
          {label}
        </label>
      )}
      <div className={stl.circle}>
        <Checkbox.Root disabled={disabled} className={clsx(stl.Root)} checked={checked} onCheckedChange={handleChecked}>
          <Checkbox.Indicator className={stl.Indicator}>
            <CheckIcon />
          </Checkbox.Indicator>
        </Checkbox.Root>
      </div>
    </div>
  );
};

export type RadixCheckbox = {
  containerClassName?: string;
  labelClassName?: string;
  label?: string;
  labelPosition?: "top" | "bottom" | "left" | "right";
  disabled?: boolean;
  checked: boolean;
  setChecked: (checked: boolean) => void;
} & ComponentPropsWithRef<"input">;
