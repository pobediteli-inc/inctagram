import { action } from "@storybook/addon-actions";
import { ImagePreview } from "./imagePreview";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ImagePreview> = {
  title: "Create/ImagePreview",
  component: ImagePreview,
  tags: ["autodocs"],
  args: {
    previewUrls: [],
    mainImageIndex: 0,
    setMainImageIndex: action("setMainImageIndex"),
    handleRemoveImage: action("handleRemoveImage"),
  },
};

export default meta;

export const Empty: StoryObj<typeof ImagePreview> = {};
