import React from "react";
import s from "./uploadStep.module.css";
import { Button, Typography } from "common/components";
import { Close } from "assets/icons";
import { ImagePreview } from "../imagePreview/imagePreview";
import { ImageSelector } from "../imageSelector/ImageSelector";

type UploadStepProps = {
  previewUrl: string;
  onCloseHandler: () => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  errorMessage: string;
};

export const UploadStep = ({
  previewUrl,
  onCloseHandler,
  fileInputRef,
  handleImageChange,
  onSubmit,
  errorMessage,
}: UploadStepProps) => {
  return (
    <div className={s.modalWrapper}>
      <div className={s.headerDataButtons}>
        <div className={s.popUpHeader}>
          <Typography variant="h2" color="light">
            Add a Profile Photo
          </Typography>
          <Button
            type={"button"}
            variant={"link"}
            onClick={onCloseHandler}
            style={{ color: "var(--light-100)", display: "contents" }}
          >
            <Close width={24} height={24} />
          </Button>
        </div>
        {errorMessage && (
          <div className={s.errorMessage}>
            <Typography variant={"bold_14"} style={{ display: "inline" }}>
              Error!
            </Typography>
            {errorMessage}
          </div>
        )}
        <ImagePreview previewUrl={previewUrl} />

        <ImageSelector
          fileInputRef={fileInputRef as React.RefObject<HTMLInputElement>}
          onSubmit={onSubmit}
          previewUrl={previewUrl}
        />
      </div>

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
    </div>
  );
};
