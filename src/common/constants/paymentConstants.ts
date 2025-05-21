import { RadioOptionProps } from "../types";

export const typeSubscriptions: RadioOptionProps[] = [
  { value: "DAY", label: "$10 per 1 day" },
  { value: "WEEKLY", label: "$50 per week" },
  { value: "MONTHLY", label: "$100 per month" },
] as const;

export const accountPlan: RadioOptionProps[] = [
  { value: "Personal", label: "Personal" },
  { value: "Business", label: "Business" },
] as const;
