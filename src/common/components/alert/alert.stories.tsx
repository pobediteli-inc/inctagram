import { Alert } from "./alert";
import "app/globals.css";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Alert",
  component: Alert,
  tags: ["autodocs"],
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: {
    children: "Your settings are saved",
  },
};
export const Danger: Story = {
  args: {
    children: "Error! Server is not available",
    variant: "danger",
  },
};
