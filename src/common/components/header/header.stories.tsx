import { Meta, StoryObj } from "@storybook/react";
import { Header } from "common/components/header/header";
import { Provider } from "react-redux";
import { store } from "store/store";

const meta: Meta<typeof Header> = {
  title: "Components/Header",
  component: Header,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Provider store={store}>
        <div style={{ width: "100%", height: "60px" }}>
          <Story style={{ width: "100%" }} />
        </div>
      </Provider>
    ),
  ],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LogIn: Story = {};

export const SignUp: Story = {};
