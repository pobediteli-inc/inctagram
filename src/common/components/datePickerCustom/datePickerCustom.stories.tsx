import "app/globals.css";
import { Meta, StoryObj } from "@storybook/react";
import { DatePickerCustom } from "./datePickerCustom";

const meta = {
  title: "Components/DatePickerCustom",
  component: DatePickerCustom,
  tags: ["autodocs"],
} satisfies Meta<typeof DatePickerCustom>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};