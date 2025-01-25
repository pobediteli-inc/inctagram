import { ComponentPropsWithoutRef, FC } from "react";
import stl from "common/components/Typography/Typography.module.css";
import { clsx } from "clsx";
import { Slot } from "@radix-ui/react-slot";

export const Typography: FC<TypographyProps> = ({
  className,
  variant = "small",
  color = "primary",
  align = "center",
  children,
  asChild,
  ...restProps
}) => {
  const Component = asChild ? Slot : "div";
  return (
    <Component
      className={clsx(
        stl.typography,
        stl[`typography-variant--${variant}`],
        stl[`typography-color--${color}`],
        stl[`typography-align--${align}`],
        className
      )}
      {...restProps}
    >
      {children}
    </Component>
  );
};

type TypographyVariant =
  | "large"
  | "h1"
  | "h2"
  | "h3"
  | "regular_16"
  | "bold_16"
  | "regular_14"
  | "medium_14"
  | "bold_14"
  | "small"
  | "bold_small"
  | "regular_link"
  | "small_link";
type TypographyColors = "primary" | "secondary" | "error" | "warning" | "success" | "link";
type TypographyAlign = "inherit" | "left" | "center" | "right" | "justify" | "initial" | "unset";
export type TypographyProps = {
  variant?: TypographyVariant;
  color?: TypographyColors;
  align?: TypographyAlign;
  asChild?: boolean;
} & ComponentPropsWithoutRef<"div">;
