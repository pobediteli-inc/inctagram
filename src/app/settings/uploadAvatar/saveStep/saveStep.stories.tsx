import { action } from "@storybook/addon-actions";
import { SaveStep } from "./saveStep";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof SaveStep> = {
  title: "Create page/SaveStep",
  component: SaveStep,
  tags: ["autodocs"],
  args: {
    description: "",
    setDescription: (_value: string) => {},
    onCloseHandler: action("onCloseHandler"),
    onBack: action("onBack"),
    onSubmit: () => {
      action("onSubmit")();
    },
    isLoading: false,
  },
};

export default meta;

export const Default: StoryObj<typeof SaveStep> = {};

export const WithDescription: StoryObj<typeof SaveStep> = {
  args: {
    description: "This is a sample description.",
  },
};

export const LoadingState: StoryObj<typeof SaveStep> = {
  args: {
    description: "Description is being submitted...",
    isLoading: true,
  },
};
