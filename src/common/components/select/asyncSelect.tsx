import AsyncReactSelect, { AsyncProps } from "react-select/async";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { Typography } from "common/components/typography/typography";
import s from "./select.module.css";
import "./select.global.css";

import { clsx } from "clsx";
import { SelectItems } from "common/types";

export type AsyncSelectProps = {
  label?: string;
} & AsyncProps<SelectItems, boolean, never>;

export const AsyncSelect = ({
  name,
  label,
  loadOptions,
  placeholder = "Выберите...",
  isDisabled,
  className,
  value,
  onChange,
  ...rest
}: AsyncSelectProps) => {
  return (
    <div className={s.selectWrapper}>
      {label && (
        <Typography variant="regular_14" color="dark" asChild>
          <label htmlFor={name} className={s.label}>
            {label}
          </label>
        </Typography>
      )}

      <AsyncReactSelect
        cacheOptions
        defaultOptions
        loadOptions={loadOptions}
        placeholder={placeholder}
        isDisabled={isDisabled}
        classNamePrefix={"custom-async-select"}
        className={clsx("custom-async-select", className)}
        value={value}
        onChange={onChange}
        {...rest}
        styles={{
          control: (base, state) => ({
            ...base,
            backgroundColor: "var(--dark-500)",
            borderColor: state.isFocused ? "var(--primary-500)" : "var(--dark-100)",
            boxShadow: state.isFocused ? "0 0 0 2px var(--primary-500)" : "none",
            minHeight: 40,
            padding: "0 5px",
            cursor: "pointer",
          }),
          input: (base) => ({
            ...base,
            color: "var(--light-100)",
          }),
          menuList: (base) => ({
            ...base,
            maxHeight: "200px",
            overflowY: "auto",
          }),
          menu: (base) => ({
            ...base,
            backgroundColor: "var(--dark-500)",
            border: "1px solid var(--dark-100)",
            zIndex: 100,
          }),
          singleValue: (base) => ({
            ...base,
            color: "var(--light-100)",
          }),
          placeholder: (base, state) => ({
            ...base,
            color: state.isDisabled ? "var(--dark-100)" : "var(--light-100)",
          }),
          option: (base, state) => ({
            ...base,
            backgroundColor: state.isFocused ? "var(--dark-100)" : "var(--dark-500)",
            color: "var(--light-100)",
            cursor: "pointer",
          }),
        }}
        components={{
          DropdownIndicator: () => <ChevronDownIcon className={s.iconDown} />,
          IndicatorSeparator: () => null,
        }}
      />
    </div>
  );
};
