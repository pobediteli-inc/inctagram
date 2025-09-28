import "app/globals.css";
import { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { DatePickerRange } from "./datePickerRange";

const meta = {
  title: "Components/DatePickerRange",
  component: DatePickerRange,
  tags: ["autodocs"],
} satisfies Meta<typeof DatePickerRange>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Pick a date range",
    onDateChange: action("date range changed"),
  },
};
