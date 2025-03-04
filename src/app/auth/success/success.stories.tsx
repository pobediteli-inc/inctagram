import { Meta, StoryObj } from "@storybook/react";
import Auth from "app/auth/page";
import Success from "./page";

const meta: Meta<typeof Auth> = {
  title: "Components/Auth/Success",
  component: Success,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Success>;

export default meta;
type Story = StoryObj<typeof Success>;

export const DefaultSuccess: Story = {};
