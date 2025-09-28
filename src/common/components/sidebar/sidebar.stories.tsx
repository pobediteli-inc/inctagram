import { Sidebar } from "./sidebar";
import "app/globals.css";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Sidebar",
  component: Sidebar,
  tags: ["autodocs"],
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
