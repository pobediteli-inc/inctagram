import * as RadixRadioGroup from "@radix-ui/react-radio-group";
import s from "./radioGroup.module.css";
import { ComponentPropsWithoutRef, ComponentRef, forwardRef, useId } from "react";
import { clsx } from "clsx";
import { Typography } from "common/components/typography/typography";
import { RadioOptionProps } from "common/types/RadioOptionProps/RadioOptionProps";

export const RadioGroup = forwardRef<ComponentRef<typeof RadixRadioGroup.Root>, RadioGroupProps>(
  ({ className, labelClassName, defaultValue, value, onValueChange, options, disabled = false, ...rest }, ref) => {
    const generateId = useId();
    const id = rest.id || generateId;

    return (
      <div className={clsx(s.radioGroupWrapper, className)}>
        <RadixRadioGroup.Root
          key={id}
          className={s.radioBaseStyles}
          defaultValue={defaultValue}
          value={value}
          onValueChange={onValueChange}
          ref={ref}
          {...rest}
        >
          {options.map((option, index) => (
            <div key={`${id}-${index}`} className={s.circle} aria-disabled={disabled}>
              <RadixRadioGroup.Item
                key={`${id}-${index}`}
                className={s.itemWrapper}
                value={option.value}
                disabled={disabled}
              >
                <RadixRadioGroup.Indicator className={clsx(s.Indicator)} aria-disabled={disabled} />
                <Typography variant={"regular_14"} color={"light"} asChild>
                  <label
                    htmlFor={`${id}-${index}`}
                    className={clsx(s.optionLabel, labelClassName)}
                    aria-disabled={disabled}
                  >
                    {option.label}
                  </label>
                </Typography>
              </RadixRadioGroup.Item>
            </div>
          ))}
        </RadixRadioGroup.Root>
      </div>
    );
  }
);

export type RadioGroupProps = {
  labelClassName?: string;
  options: RadioOptionProps[];
} & ComponentPropsWithoutRef<typeof RadixRadioGroup.Root>;

RadioGroup.displayName = "RadioGroup";
