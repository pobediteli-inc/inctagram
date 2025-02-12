import { Meta, StoryObj } from "@storybook/react";
import Login from "app/login/page";

const meta: Meta<typeof Login> = {
  title: "Components/Login",
  component: Login,
  tags: ["autodocs"],
  argTypes: {},
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div style={{ minWidth: 380 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Login>;

export default meta;
type Story = StoryObj<typeof Login>;

export const DefaultLogin: Story = {};
