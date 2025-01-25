import { ComponentPropsWithoutRef, FC } from "react";
import stl from "common/components/Button/Button.module.css";
import { clsx } from "clsx";
import { Slot } from "@radix-ui/react-slot";

type ButtonVariant = "primary" | "secondary" | "outlined";
export type ButtonProps = {
  variant?: ButtonVariant;
  asChild?: boolean;
} & ComponentPropsWithoutRef<"button">;

export const Button: FC<ButtonProps> = ({ variant = "primary", className, asChild, ...restProps }) => {
  const Component = asChild ? Slot : "button";
  return (
    <Component className={clsx(stl.button, stl[variant], { [stl.notAnimation]: asChild }, className)} {...restProps} />
  );
};
