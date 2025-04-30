import React from "react";
import { action } from "@storybook/addon-actions";
import { ImageSelector } from "./ImageSelector";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ImageSelector> = {
  title: "Create page/ImageSelector",
  component: ImageSelector,
  tags: ["autodocs"],
  args: {
    fileInputRef: React.createRef<HTMLInputElement>(),
    setShowForm: (value: boolean) => action("setShowForm")(value),
  },
};

export default meta;

export const Default: StoryObj<typeof ImageSelector> = {};
