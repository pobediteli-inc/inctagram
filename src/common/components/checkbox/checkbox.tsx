import React, { ComponentPropsWithoutRef, ComponentRef, forwardRef, useId } from "react";
import * as RadixCheckbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import s from "./checkbox.module.css";
import { clsx } from "clsx";
import { PositionProps } from "common/types/PositionProps/PositionProps";
import { Typography } from "common/components/typography/typography";

export const Checkbox = forwardRef<ComponentRef<typeof RadixCheckbox.Root>, CheckboxProps>(
  ({ className, labelClassName, label, labelPosition, checked, onCheckedChange, disabled = false, ...rest }, ref) => {
    const generatedId = useId();
    const id = rest.id || generatedId;

    return (
      <div className={clsx(s.checkboxContainer, labelPosition && s[`label-${labelPosition}`], className)}>
        <div className={clsx(s.circle, { [s.disabled]: disabled })}>
          <RadixCheckbox.Root
            id={id}
            ref={ref}
            disabled={disabled}
            className={clsx(s.checkboxBaseStyles)}
            checked={checked}
            onCheckedChange={onCheckedChange}
            {...rest}
          >
            <RadixCheckbox.Indicator className={s.Indicator}>
              <CheckIcon />
            </RadixCheckbox.Indicator>
          </RadixCheckbox.Root>
        </div>
        {label && (
          <Typography variant="regular_14" color={"light"} asChild>
            <label htmlFor={id} className={clsx(s.checkboxLabel, { [s.labelDisabled]: disabled }, labelClassName)}>
              {label}
            </label>
          </Typography>
        )}
      </div>
    );
  }
);

export type CheckboxProps = {
  labelClassName?: string;
  label?: string;
  labelPosition?: PositionProps;
} & ComponentPropsWithoutRef<typeof RadixCheckbox.Root>;

Checkbox.displayName = "Checkbox";
