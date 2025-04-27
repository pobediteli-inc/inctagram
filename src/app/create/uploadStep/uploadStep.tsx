import React, { ChangeEvent, RefObject } from "react";
import s from "./uploadStep.module.css";
import { Button, Typography } from "common/components";
import { Close } from "assets/icons";
import { ImagePreview } from "../imagePreview/imagePreview";

type UploadStepProps = {
  previewUrls: string[];
  mainImageIndex: number;
  setMainImageIndex: (index: number) => void;
  handleRemoveImage: (index: number) => void;
  onCloseHandler: () => void;
  fileInputRef: RefObject<HTMLInputElement | null>;
  handleImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
  setShowForm: (value: boolean) => void;
};

export const UploadStep = ({
  previewUrls,
  mainImageIndex,
  setMainImageIndex,
  handleRemoveImage,
  onCloseHandler,
  fileInputRef,
  handleImageChange,
  setShowForm,
}: UploadStepProps) => {
  const hasImages = previewUrls.length > 0;

  const onSelectClickHandler = () => {
    fileInputRef.current?.click();
  };

  const onNextClickHandler = () => {
    setShowForm(true);
  };

  const renderButtons = () => {
    if (hasImages) {
      return (
        <Button type="button" variant="link" onClick={onNextClickHandler} style={{ display: "contents" }}>
          Next
        </Button>
      );
    }
    return (
      <Button
        type={"button"}
        variant={"link"}
        onClick={onCloseHandler}
        style={{ color: "var(--light-100)", display: "contents" }}
      >
        <Close width={24} height={24} />
      </Button>
    );
  };

  const renderImagePreview = () => (
    <ImagePreview
      previewUrls={previewUrls}
      mainImageIndex={mainImageIndex}
      setMainImageIndex={setMainImageIndex}
      handleRemoveImage={handleRemoveImage}
      onSelectClickHandler={onSelectClickHandler}
    />
  );

  const renderFileInput = () => (
    <div className={s.fileInputWrapper}>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
        id="photo-upload"
        ref={fileInputRef}
        className={s.fileUpload}
        style={{ display: "none" }}
      />
    </div>
  );

  const renderAdditionalButtons = () => {
    if (!hasImages) {
      return (
        <div className={s.btnGroup}>
          <Button type="button" variant={"primary"} onClick={onSelectClickHandler}>
            Select from Computer
          </Button>
          <Button type="button" variant="outlined">
            Open draft
          </Button>
        </div>
      );
    }
  };

  return (
    <div className={s.modalWrapper}>
      <div className={s.headerDataButtons}>
        <div className={s.popUpHeader}>
          <Typography variant="h2" color="light">
            {hasImages ? "Edit Photos" : "Add Photos"}
          </Typography>
          {renderButtons()}
        </div>

        {renderImagePreview()}

        {renderAdditionalButtons()}
        {renderFileInput()}
      </div>
    </div>
  );
};
