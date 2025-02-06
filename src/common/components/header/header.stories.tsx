import { Meta, StoryObj } from "@storybook/react";
import { Header } from "common/components/header/header";

const meta: Meta<typeof Header> = {
  title: "Components/Header",
  component: Header,
  argTypes: {
    isAuth: {
      control: "boolean",
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: "100%", height: "60px" }}>
        <Story style={{ width: "100%" }} />
      </div>
    ),
  ],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LogIn: Story = {
  args: {
    isAuth: true,
  },
};

export const SignUp: Story = {
  args: {
    isAuth: false,
  },
};
