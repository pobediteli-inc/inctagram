import { Meta, StoryObj } from "@storybook/react";
import SignUp from "app/signUp/page";
import Success from "./page";

const meta: Meta<typeof SignUp> = {
  title: "Components/SignUp/Success",
  component: Success,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Success>;

export default meta;
type Story = StoryObj<typeof Success>;

export const DefaultSuccess: Story = {};
