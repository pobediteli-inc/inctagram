import "app/globals.css";
import { Meta, StoryObj } from "@storybook/react";
import { DatePickerWithRange } from "./datePickerRange";
import "../calendar/calendar.style.css";

const meta = {
  title: "Components/DatePickerWithRange",
  component: DatePickerWithRange,
  tags: ["autodocs"],
} satisfies Meta<typeof DatePickerWithRange>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
