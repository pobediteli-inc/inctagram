import { ComponentPropsWithoutRef, FC } from "react";
import stl from "common/components/Button/Button.module.css";
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
      className={clsx(stl.buttonBaseStyles, stl[variant], { [stl.notAnimation]: asChild }, className)}
      {...restProps}
    />
  );
};
