import { Meta, StoryObj } from "@storybook/react";
import { BaseModal } from "./baseModal";
import "app/globals.css";
import { Typography } from "../../typography/typography";
import { Button } from "../../button/button";

const meta: Meta<typeof BaseModal> = {
  title: "Components/BaseModal",
  component: BaseModal,
  argTypes: {
    open: {
      description: "Controls whether the modal is open",
      control: { type: "boolean" },
    },
    onClose: { action: "closed" },
    modalTitle: {
      description: "Title of the modal",
      control: { type: "text" },
    },
  },
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof BaseModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    open: true,
    modalTitle: "Modal Title",
    onClose: () => {},
    children: (
      <div style={{ padding: "20px" }}>
        <Typography variant="regular_16" color={"light"}>
          This is the modal content.
        </Typography>
        <Button onClick={() => {}}>Close</Button>
      </div>
    ),
  },
};
