import { Meta, StoryObj } from "@storybook/react";
import { RadioGroup } from "common/components/radioGroup/radioGroup";

const meta: Meta<typeof RadioGroup> = {
  title: "Components/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
  argTypes: {
    options: {
      control: { type: "object" },
    },
    disabled: { control: "boolean" },
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const RadioGroupOptions: Story = {
  args: {
    options: [{ value: "value1", label: "option1" }],
    disabled: false,
  },
};

export const RadioGroupDisabled: Story = {
  args: {
    options: [{ value: "value", label: "option1" }],
    disabled: true,
  },
};
