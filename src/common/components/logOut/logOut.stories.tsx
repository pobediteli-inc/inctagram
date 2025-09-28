import { Meta, StoryObj } from "@storybook/react";
import { LogOut } from "./logOut";

const meta: Meta<typeof LogOut> = {
  title: "Components/LogOut",
  component: LogOut,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    email: {
      control: "text",
      description: "User email displayed in the logout modal",
      defaultValue: "Epam@epam.com",
    },
    onLogOutAction: { action: "logout clicked" },
  },
};

export default meta;
type Story = StoryObj<typeof LogOut>;

export const Default: Story = {};
