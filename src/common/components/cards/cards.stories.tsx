import "app/globals.css";
import { Cards } from "./cards";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Cards",
  component: Cards,
  tags: ["autodocs"],
} satisfies Meta<typeof Cards>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
