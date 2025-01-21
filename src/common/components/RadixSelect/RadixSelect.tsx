import { FC } from "react";
import stl from "./RadixSelect.module.css";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import * as Select from "@radix-ui/react-select";
import { RadixSelectItem } from "common/components/RadixSelect/RadixSelectItems/RadixSelectItems";
import { ChevronUpIcon } from "@radix-ui/react-icons";
import { clsx } from "clsx";
import FlagUnitedKingdom from "common/components/SVGComponents/FlagUnitedKingdom";
import FlagRussia from "common/components/SVGComponents/FlagRussia";

type Props = {
  className?: string;
  label?: string;
  disabled?: boolean;
  ariaLabel?: string;
};

export const RadixSelect: FC<Props> = ({ label, className, disabled, ariaLabel }) => {
  return (
    <div className={stl.selectWrapper}>
      {label && (
        <label className={stl.selectLabel} aria-disabled={disabled} htmlFor={"radix-select"}>
          {label}
        </label>
      )}
      <Select.Root disabled={disabled}>
        <Select.Trigger className={clsx(stl.Trigger, className)} aria-label={ariaLabel}>
          <Select.Value placeholder="Select language" />
          <Select.Icon>
            <ChevronDownIcon />
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content className={stl.Content} position={"popper"}>
            <Select.ScrollUpButton className={stl.ScrollButton}>
              <ChevronUpIcon />
            </Select.ScrollUpButton>
            <Select.Viewport className={stl.Viewport}>
              <Select.Group>
                <Select.Label className={stl.selectLabel}>Languages</Select.Label>
                <Select.Separator className={stl.Separator} />
                {/* Доступные языки */}
                <RadixSelectItem value="en">
                  <div className={stl.flags}>
                    <FlagUnitedKingdom width={20} height={20} color={"red"}/>
                    English
                  </div>
                </RadixSelectItem>
                <RadixSelectItem value="ru">
                  <div className={stl.flags}>
                    <FlagRussia width={20} height={20} />
                    Russian
                  </div>
                </RadixSelectItem>
              </Select.Group>
            </Select.Viewport>
            <Select.ScrollDownButton className={stl.selectScrollButton}>
              <ChevronDownIcon />
            </Select.ScrollDownButton>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
};
