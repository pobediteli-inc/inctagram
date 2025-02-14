import * as RadixRadioGroup from "@radix-ui/react-radio-group";
import s from "./radioGroup.module.css";
import { ComponentPropsWithoutRef, ComponentRef, forwardRef, useId } from "react";
import { PositionProps } from "common/types";
import { clsx } from "clsx";
import { Typography } from "common/components/typography/typography";
import { RadioOptionProps } from "common/types/RadioOptionProps/RadioOptionProps";

export const RadioGroup = forwardRef<ComponentRef<typeof RadixRadioGroup.Root>, Props>(
  (
    {
      className,
      labelClassName,
      label,
      labelPosition,
      defaultValue,
      value,
      onValueChange,
      options,
      disabled = false,
      ...rest
    },
    ref
  ) => {
    const generateId = useId();
    const id = rest.id || generateId;

    return (
      <div className={clsx(s.radioGroupWrapper, labelPosition && s[`label-${labelPosition}`], className)}>
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
                <Typography variant={"regular_14"} color={"light"} textAlign={"right"} asChild>
                  <label htmlFor={`${id}-${index}`} className={s.optionLabel} aria-disabled={disabled}>
                    {option.label}
                  </label>
                </Typography>
              </RadixRadioGroup.Item>
            </div>
          ))}
        </RadixRadioGroup.Root>
        {label && (
          <Typography variant={"regular_14"} color={"light"} asChild>
            <label htmlFor={id} className={labelClassName} aria-disabled={disabled}>
              {label}
            </label>
          </Typography>
        )}
      </div>
    );
  }
);

type Props = {
  labelClassName?: string;
  label?: string;
  labelPosition?: PositionProps;
  options: RadioOptionProps[];
} & ComponentPropsWithoutRef<typeof RadixRadioGroup.Root>;

RadioGroup.displayName = "RadioGroup";
