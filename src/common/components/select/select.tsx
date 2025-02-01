import { ComponentPropsWithoutRef, FC } from "react";
import stl from "./select.module.css";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import * as RadixSelect from "@radix-ui/react-select";
import { SelectItem } from "common/components/select/selectItems/selectItems";
import { ChevronUpIcon } from "@radix-ui/react-icons";
import { clsx } from "clsx";
import FlagUnitedKingdom from "assets/icons/FlagUnitedKingdom";
import FlagRussia from "assets/icons/FlagRussia";

type Props = {
  className?: string;
  label?: string;
  disabled?: boolean;
  ariaLabel?: string;
} & ComponentPropsWithoutRef<typeof RadixSelect.Trigger>;

export const Select: FC<Props> = ({ label, className, disabled, ariaLabel }) => {
  return (
    <div className={stl.selectWrapper}>
      {label && (
        <label className={stl.selectLabel} aria-disabled={disabled} htmlFor={"radix-select"}>
          {label}
        </label>
      )}
      <RadixSelect.Root defaultValue={"en"} disabled={disabled}>
        <RadixSelect.Trigger className={clsx(stl.Trigger, className)} aria-label={ariaLabel}>
          <RadixSelect.Value placeholder="Select language" />
          <RadixSelect.Icon>
            <ChevronDownIcon />
          </RadixSelect.Icon>
        </RadixSelect.Trigger>

        <RadixSelect.Portal>
          <RadixSelect.Content className={stl.Content} position={"popper"}>
            <RadixSelect.ScrollUpButton className={stl.ScrollButton}>
              <ChevronUpIcon />
            </RadixSelect.ScrollUpButton>
            <RadixSelect.Viewport className={stl.Viewport}>
              <RadixSelect.Group>
                <RadixSelect.Label className={stl.selectLabel}>Languages</RadixSelect.Label>
                <RadixSelect.Separator className={stl.Separator} />
                <SelectItem value="en">
                  <div className={stl.flags}>
                    <FlagUnitedKingdom width={20} height={20} color={"red"} />
                    English
                  </div>
                </SelectItem>
                <SelectItem value="ru">
                  <div className={stl.flags}>
                    <FlagRussia width={20} height={20} />
                    Russian
                  </div>
                </SelectItem>
              </RadixSelect.Group>
            </RadixSelect.Viewport>
            <RadixSelect.ScrollDownButton className={stl.selectScrollButton}>
              <ChevronDownIcon />
            </RadixSelect.ScrollDownButton>
          </RadixSelect.Content>
        </RadixSelect.Portal>
      </RadixSelect.Root>
    </div>
  );
};
