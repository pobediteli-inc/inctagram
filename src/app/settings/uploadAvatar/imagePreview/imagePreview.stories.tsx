import { Meta, StoryObj } from "@storybook/react";
import { ImagePreview } from "./imagePreview";

const meta: Meta<typeof ImagePreview> = {
  title: "Create page/ImagePreview",
  component: ImagePreview,
  tags: ["autodocs"],
  args: {
    previewUrl: "",
  },
};

export default meta;

export const Empty: StoryObj<typeof ImagePreview> = {};

export const WithImage: StoryObj<typeof ImagePreview> = {
  args: {
    previewUrl: "https://i.pinimg.com/originals/ff/00/43/ff0043dfe21545f12c50926bb8b59bf3.jpg",
  },
};
