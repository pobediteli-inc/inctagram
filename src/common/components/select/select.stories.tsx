import { Meta, StoryObj } from "@storybook/react";
import { Select } from "./select";

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  tags: ["autodocs"],
  argTypes: {
    items: {
      control: { type: "object" },
    },
    disabled: { control: "boolean" },
  },
  args: {
    defaultValue: "english",
    groupLabel: "Languages",
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof Select>;

export const SelectLanguages: Story = {
  args: {
    label: "select languages",
    items: [
      { value: "english", label: "English" },
      { value: "russian", label: "Russian" },
      { value: "spanish", label: "Spanish" },
      { value: "french", label: "French" },
      { value: "turkish", label: "Turkish" },
    ],
    disabled: false,
  },
};

export const SelectDisabled: Story = {
  args: {
    label: "select languages",
    items: [
      { value: "english", label: "English" },
      { value: "russian", label: "Russian" },
      { value: "spanish", label: "Spanish" },
      { value: "french", label: "French" },
    ],
    disabled: true,
  },
};
