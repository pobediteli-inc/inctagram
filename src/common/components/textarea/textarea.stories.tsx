import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "./textarea";

const meta: Meta<typeof Textarea> = {
  title: "Components/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    error: { control: "text" },
    disabled: { control: "boolean" },
    maxLength: { control: "number" },
    hideCounter: { control: "boolean" },
    height: {
      control: { type: "text" },
      description: "Height of the textarea (e.g. '52px' or number)",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    title: "Text-area",
    value: "",
  },
};

export const WithError: Story = {
  args: {
    title: "Text-area",
    error: "Error text",
    value: "Something went wrong...",
  },
};

export const Disabled: Story = {
  args: {
    title: "Text-area",
    disabled: true,
    value: "Disabled text",
  },
};

export const WithMaxLength: Story = {
  args: {
    title: "Text-area",
    maxLength: 10,
    value: "",
  },
};

export const NoCounter: Story = {
  args: {
    title: "Text-area",
    maxLength: 20,
    hideCounter: true,
    value: "",
  },
};

export const FixedHeight: Story = {
  args: {
    title: "Text-area",
    height: "52px",
    value: "",
  },
};
