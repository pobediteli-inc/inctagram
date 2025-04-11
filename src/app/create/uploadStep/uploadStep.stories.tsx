import React from "react";
import { action } from "@storybook/addon-actions";
import { UploadStep } from "./uploadStep";

export default {
  title: "Create page/UploadStep",
  component: UploadStep,
  tags: ["autodocs"],
  argTypes: {
    previewUrls: { control: "array" },
    mainImageIndex: { control: "number" },
    fileInputRef: { control: "object" },
  },
};

const Template = () => {
  return (
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
  );
};

export const Default = Template.bind({});
