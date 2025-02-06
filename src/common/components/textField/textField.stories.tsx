import { Meta, StoryObj } from "@storybook/react";
import { TextField } from "./textField";

const meta: Meta<typeof TextField> = {
  title: "Components/TextField",
  component: TextField,
  tags: ["autodocs"],
  argTypes: {
    className: {
      table: {
        disable: true,
      },
    },
    textFieldClassName: {
      table: {
        disable: true,
      },
    },
    labelClassName: {
      table: {
        disable: true,
      },
    },
    errorClassName: {
      table: {
        disable: true,
      },
    },
    asChild: {
      table: {
        disable: true,
      },
    },
    error: {
      table: {
        disable: true,
      },
    },
    style: {
      table: {
        disable: true,
      },
    },
    variant: {
      control: { type: "select" },
      options: ["standard", "outlined", "filled"],
    },
    type: {
      control: { type: "select" },
      options: ["text", "password", "email", "number"],
    },
    disabled: { control: "boolean" },
  },
  parameters: {
    layout: "centered",
  },
  args: {
    style: { width: "330px" },
  },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof TextField>;

export const textFieldStandard: Story = {
  args: {
    variant: "standard",
    type: "text",
    label: "TextField",
    error: null,
    disabled: false,
  },
};
export const textFieldFilled: Story = {
  args: {
    variant: "filled",
    type: "text",
    label: "TextField",
    error: null,
    disabled: false,
  },
};
export const textFieldOutlined: Story = {
  args: {
    variant: "outlined",
    type: "text",
    label: "TextField",
    error: null,
    disabled: false,
  },
};
export const textFieldError: Story = {
  args: {
    variant: "standard",
    type: "text",
    label: "TextField",
    error: "Some error occurred",
    disabled: false,
  },
};
export const textFieldDisabled: Story = {
  args: {
    variant: "outlined",
    type: "text",
    label: "TextField",
    error: null,
    disabled: true,
  },
};
