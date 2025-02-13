import { ComponentPropsWithoutRef, ComponentRef, forwardRef, useId } from "react";
import s from "./select.module.css";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import * as RadixSelect from "@radix-ui/react-select";
import { clsx } from "clsx";
import { SelectItem } from "common/components/select/selectItems/selectItems";
import { Typography } from "common/components/typography/typography";
import { SelectItemsProps } from "common/types";

export const Select = forwardRef<ComponentRef<typeof RadixSelect.Trigger>, Props>(
  ({ className, labelClassName, defaultValue, label, disabled, items, ...rest }, ref) => {
    const generatedId = useId();
    const id = rest.id || generatedId;

    return (
      <div className={s.selectWrapper}>
        {label && (
          <Typography variant={"regular_14"} color={"dark"} asChild>
            <label htmlFor={id} className={labelClassName}>
              {label}
            </label>
          </Typography>
        )}
        <Typography variant={"regular_14"} color={"light"}>
          <RadixSelect.Root defaultValue={defaultValue} disabled={disabled}>
            <RadixSelect.Trigger id={id} className={clsx(s.Trigger, className)} ref={ref} {...rest}>
              <RadixSelect.Value placeholder="Select language" />
              <RadixSelect.Icon>
                <ChevronDownIcon />
              </RadixSelect.Icon>
            </RadixSelect.Trigger>

            <RadixSelect.Portal>
              <RadixSelect.Content className={s.Content} position={"popper"}>
                <RadixSelect.ScrollUpButton className={s.ScrollButton}>
                  <ChevronUpIcon />
                </RadixSelect.ScrollUpButton>
                <RadixSelect.Viewport className={s.Viewport}>
                  <RadixSelect.Group>
                    <RadixSelect.Label style={{ marginLeft: 5 }}>Languages</RadixSelect.Label>
                    <RadixSelect.Separator className={s.Separator} />
                    {items.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        <Typography variant={"regular_14"} className={s.selectItems}>
                          {item.icon} {item.label}
                        </Typography>
                      </SelectItem>
                    ))}
                  </RadixSelect.Group>
                </RadixSelect.Viewport>
                <RadixSelect.ScrollDownButton>
                  <ChevronDownIcon />
                </RadixSelect.ScrollDownButton>
              </RadixSelect.Content>
            </RadixSelect.Portal>
          </RadixSelect.Root>
        </Typography>
      </div>
    );
  }
);

type Props = {
  id?: string;
  className?: string;
  labelClassName?: string;
  label?: string;
  items: SelectItemsProps[];
} & ComponentPropsWithoutRef<typeof RadixSelect.Root>;

Select.displayName = "Select";
