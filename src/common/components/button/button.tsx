import { ComponentPropsWithoutRef, FC } from "react";
import s from "./button.module.css";
import { clsx } from "clsx";
import { Slot } from "@radix-ui/react-slot";

type VariantProps = "primary" | "secondary" | "outlined" | "link";
export type Props = {
  variant?: VariantProps;
  asChild?: boolean;
} & ComponentPropsWithoutRef<"button">;

export const Button: FC<Props> = ({ variant = "primary", asChild = false, className, ...restProps }) => {
  const Component = asChild ? Slot : "button";
  return (
    <Component
      className={clsx(s.buttonBaseStyles, s[variant], { [s.notAnimation]: asChild }, className)}
      {...restProps}
    />
  );
};
