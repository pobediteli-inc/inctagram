import React from "react";
import s from "./imageSelector.module.css";
import { Button } from "common/components/button/button";

type ImageSelectorProps = {
  fileInputRef: React.RefObject<HTMLInputElement>;
  setShowForm: (value: boolean) => void;
};

export const ImageSelector = ({ fileInputRef, setShowForm }: ImageSelectorProps) => {
  const onSelectClickHandler = () => {
    fileInputRef.current?.click();
  };
  const onNextClickHandler = () => {
    setShowForm(true);
  };

  return (
    <div className={s.btnGroup}>
      <Button className={s.btnForm} type="button" onClick={onSelectClickHandler}>
        Select from Computer
      </Button>
      <Button className={s.btnForm} type="button" variant="outlined" onClick={onNextClickHandler}>
        Next
      </Button>
    </div>
  );
};
