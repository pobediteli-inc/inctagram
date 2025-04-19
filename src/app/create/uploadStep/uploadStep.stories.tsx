import React from "react";
import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";
import { UploadStep } from "./uploadStep";

const meta: Meta<typeof UploadStep> = {
  title: "Create page/UploadStep",
  component: UploadStep,
  tags: ["autodocs"],
  argTypes: {
    mainImageIndex: { control: "number" },
    fileInputRef: { control: "object" },
  },
};

export default meta;

type Story = StoryObj<typeof UploadStep>;

export const Default: Story = {
  render: () => (
    <UploadStep
      previewUrls={[]}
      mainImageIndex={0}
      fileInputRef={React.createRef()}
      setMainImageIndex={(index) => action("setMainImageIndex")(index)}
      handleRemoveImage={(index) => action("handleRemoveImage")(index)}
      onCloseHandler={() => action("onCloseHandler")()}
      handleImageChange={(e) => action("handleImageChange")(e)}
      setShowForm={(value) => action("setShowForm")(value)}
    />
  ),
};
