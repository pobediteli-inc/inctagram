import { ComponentPropsWithoutRef, FC } from "react";
import stl from "common/components/Typography/Typography.module.css";
import "app/globals.css";
import { clsx } from "clsx";
import { Slot } from "@radix-ui/react-slot";

export const Typography: FC<TypographyProps> = ({
  className,
  variant = "small",
  color = "light",
  textAlign = "left",
  children,
  asChild,
  ...restProps
}) => {
  const Component = asChild ? Slot : "div";
  return (
    <Component
      className={clsx(
        stl.TypographyBaseStyles,
        stl[`variant-${variant}`],
        stl[`color-${color}`],
        stl[`align-${textAlign}`],
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
type TypographyColors = "light" | "dark" | "blue" | "lightBlue" | "deepBlue" | "error" | "disabled";
type TypographyAlign = "inherit" | "left" | "center" | "right" | "justify" | "initial" | "unset";
export type TypographyProps = {
  variant?: TypographyVariant;
  color?: TypographyColors;
  textAlign?: TypographyAlign;
  asChild?: boolean;
} & ComponentPropsWithoutRef<"div">;
