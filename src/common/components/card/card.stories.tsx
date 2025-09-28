import "app/globals.css";
import { Card } from "./card";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Cards",
  component: Card,
  tags: ["autodocs"],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
