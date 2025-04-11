import { action } from "@storybook/addon-actions";
import { DescriptionStep } from "./descriptionStep";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof DescriptionStep> = {
  title: "Create page/DescriptionStep",
  component: DescriptionStep,
  tags: ["autodocs"],
  args: {
    description: "",
    setDescription: (value: string) => {},
    onCloseHandler: action("onCloseHandler"),
    onBack: action("onBack"),
    onSubmit: () => {
      action("onSubmit")();
    },
    isLoading: false,
  },
};

export default meta;

export const Default: StoryObj<typeof DescriptionStep> = {};

export const WithDescription: StoryObj<typeof DescriptionStep> = {
  args: {
    description: "This is a sample description.",
  },
};

export const LoadingState: StoryObj<typeof DescriptionStep> = {
  args: {
    description: "Description is being submitted...",
    isLoading: true,
  },
};
