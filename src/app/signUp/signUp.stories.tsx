import { Meta, StoryObj } from "@storybook/react";
import SignUp from "app/signUp/page";

const meta: Meta<typeof SignUp> = {
  title: "Components/SignUp",
  component: SignUp,
  tags: ["autodocs"],
  argTypes: {},
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div style={{ minWidth: "380px" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SignUp>;

export default meta;
type Story = StoryObj<typeof SignUp>;

export const DefaultSignUp: Story = {};
