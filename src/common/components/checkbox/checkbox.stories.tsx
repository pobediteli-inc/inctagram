import { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  argTypes: {
    labelClassName: {
      table: { disable: true },
    },
    labelPosition: {
      control: { type: "select" },
      options: ["top", "right", "bottom", "left", "center"],
    },
    checked: { control: "boolean" },
    onCheckedChange: { action: "checked" },
    disabled: { control: "boolean" },
  },
  parameters: {
    layout: "labelPosition",
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const CheckedTrue: Story = {
  args: {
    label: "Checked Checkbox",
    labelPosition: "center",
    checked: true,
    disabled: false,
  },
};

export const CheckedFalse: Story = {
  args: {
    label: "Unchecked Checkbox",
    labelPosition: "center",
    checked: false,
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled Checkbox",
    labelPosition: "center",
    disabled: true,
  },
};
