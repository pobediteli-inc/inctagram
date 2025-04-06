import { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "./textarea";

const meta: Meta<typeof Textarea> = {
  title: "Components/Textarea",
  component: Textarea,
  argTypes: {
    title: { control: "text" },
    error: { control: "text" },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    title: "Text-area",
  },
};

export const WithError: Story = {
  args: {
    title: "Text-area",
    error: "Error text",
  },
};

export const Disabled: Story = {
  args: {
    title: "Text-area",
    disabled: true,
  },
};

export const WithMaxLength: Story = {
  args: {
    title: "Text-area",
    maxLength: 10,
  },
};
