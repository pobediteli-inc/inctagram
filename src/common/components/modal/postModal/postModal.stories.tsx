import { Meta, StoryObj } from "@storybook/react";
import "app/globals.css";
import { Typography } from "../../typography/typography";
import { PostModal } from "./postModal";

const meta: Meta<typeof PostModal> = {
  title: "Components/PostModal",
  component: PostModal,
  argTypes: {
    open: {
      description: "Controls whether the modal is open",
      control: { type: "boolean" },
    },
    onClose: { action: "closed" },
  },
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof PostModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    open: true,
    onClose: () => {},
    children: (
      <div>
        <Typography variant="regular_16" color={"light"}>
          This is the modal content.
        </Typography>
      </div>
    ),
  },
};
