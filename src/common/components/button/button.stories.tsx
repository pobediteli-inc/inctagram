import { Button } from "./button";
import "app/globals.css";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  argTypes: {
    variant: {
      description: "Button variant",
      control: { type: "radio" },
      options: ["primary", "secondary", "outlined", "link"],
    },
    onClick: { action: "clicked" },
  },
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Primary Button",
    asChild: false,
    disabled: false,
  },
};
export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary Button",
    asChild: false,
    disabled: false,
  },
};
export const Outlined: Story = {
  args: {
    variant: "outlined",
    children: "Outlined Button",
    asChild: false,
    disabled: false,
  },
};
export const Link: Story = {
  args: {
    variant: "link",
    children: (
      <a href={"/"} target={"_blank"} rel="noopener noreferrer">
        asChild = true Button component using as link
      </a>
    ),
    asChild: true,
    disabled: true,
  },
};
export const Disabled: Story = {
  args: {
    variant: "primary",
    children: "Disabled Button",
    asChild: false,
    disabled: true,
  },
};
