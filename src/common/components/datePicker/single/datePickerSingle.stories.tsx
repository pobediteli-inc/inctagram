import "react-day-picker/style.css";
import "app/globals.css";
import { Meta, StoryObj } from "@storybook/react";
import { DatePickerSingle } from "./datePickerSingle";

const meta = {
  title: "Components/DatePickerSingle",
  component: DatePickerSingle,
  tags: ["autodocs"],
} satisfies Meta<typeof DatePickerSingle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Pick a date",
    onDateChange: (date) => console.log("Selected single date:", date),
  },
};
