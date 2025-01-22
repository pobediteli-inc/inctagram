import { ComponentPropsWithoutRef } from "react";

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
type TypographyColors = "primary" | "secondary" | "error" | "warning" | "success";
type TypographyAlign = "inherit" | "left" | "center" | "right" | "justify" | "initial" | "unset";
export type TypographyProps = {
  variant?: TypographyVariant;
  color?: TypographyColors;
  align?: TypographyAlign;
  asChild?: boolean;
} & ComponentPropsWithoutRef<"div">;
