import "app/globals.css";
import { Meta, StoryObj } from "@storybook/react";
import { DatePicker } from "./datePicker";

const meta = {
  title: "Components/DatePicker",
  component: DatePicker,
  tags: ["autodocs"],
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
