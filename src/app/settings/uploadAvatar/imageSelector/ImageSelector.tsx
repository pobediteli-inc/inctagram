import React from "react";
import s from "./imageSelector.module.css";
import { Button } from "common/components/button/button";

type ImageSelectorProps = {
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onSubmit: () => void;
  previewUrl: string;
};

export const ImageSelector = ({ fileInputRef, onSubmit, previewUrl }: ImageSelectorProps) => {
  const onSelectClickHandler = () => {
    fileInputRef.current?.click();
  };
  const onSaveClickHandler = () => {
    onSubmit();
  };

  return (
    <div className={s.btnGroup}>
      {!previewUrl && (
        <Button className={s.selectButton} type="button" onClick={onSelectClickHandler}>
          Select from Computer
        </Button>
      )}
      {previewUrl && (
        <Button className={s.saveButton} type="button" onClick={onSaveClickHandler}>
          Save
        </Button>
      )}
    </div>
  );
};
