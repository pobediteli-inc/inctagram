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
    labelPosition: {
      control: { type: "select" },
      options: ["top", "right", "bottom", "left", "center"],
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
    label: "radio group label",
    options: [{ value: "option1", label: "option1" }],
    labelPosition: "top",
    disabled: false,
  },
};

export const RadioGroupDisabled: Story = {
  args: {
    label: "radio group label",
    options: [
      { value: "option1", label: "option1" },
      { value: "option2", label: "option2" },
      { value: "option3", label: "option3" },
      { value: "option4", label: "option4" },
    ],
    disabled: true,
  },
};
