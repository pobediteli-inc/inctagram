import React from "react";
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
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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

  return (
    <div className={s.modalWrapper}>
      <div className={s.headerDataButtons}>
        <div className={s.popUpHeader}>
          <Typography variant="h2" color="light">
            {hasImages ? "Edit Photos" : "Add Photos"}
          </Typography>

          {hasImages ? (
            <Button className={s.nextBtn} type="button" variant="link" onClick={onNextClickHandler}>
              Next
            </Button>
          ) : (
            <Button className={s.closeBtn} onClick={onCloseHandler}>
              <Close width={24} height={24} />
            </Button>
          )}
        </div>

        <ImagePreview
          previewUrls={previewUrls}
          mainImageIndex={mainImageIndex}
          setMainImageIndex={setMainImageIndex}
          handleRemoveImage={handleRemoveImage}
          onSelectClickHandler={onSelectClickHandler}
        />

        <div>
          {!hasImages && (
            <div className={s.btnGroup}>
              <Button className={s.btnForm} type="button" onClick={onSelectClickHandler}>
                Select from Computer
              </Button>
              <Button className={s.btnForm} type="button" variant="outlined">
                Open draft
              </Button>
            </div>
          )}
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
    </div>
  );
};
