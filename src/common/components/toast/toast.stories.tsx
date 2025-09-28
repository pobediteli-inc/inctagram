import { Meta, StoryObj } from "@storybook/react";
import { Toast } from "./toast";

const meta: Meta<typeof Toast> = {
  title: "Components/Toast",
  component: Toast,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["success", "error", "info", "warning"],
      description: "type of description",
    },
    message: {
      control: "text",
      description: "messages",
    },
    open: {
      control: "boolean",
      description: "open",
    },
    setOpen: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    open: true,
    type: "info",
    message: "This is a default notification message",
  },
  decorators: [
    (Story) => (
      <div style={{ height: "100px" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Toast>;

export default meta;

type Story = StoryObj<typeof Toast>;

export const SuccessToast: Story = {
  args: {
    type: "success",
    message: "Your action was completed successfully!",
    open: true,
  },
};

export const ErrorToast: Story = {
  args: {
    type: "error",
    message: "An error occurred. Please try again.",
    open: true,
  },
};

export const InfoToast: Story = {
  args: {
    type: "info",
    message: "Here is some important information for you.",
    open: true,
  },
};

export const WarningToast: Story = {
  args: {
    type: "warning",
    message: "Be careful! This is a warning message.",
    open: true,
  },
};
