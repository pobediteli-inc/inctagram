import React from "react";
import Image from "next/image";
import s from "./imagePreview.module.css";
import { ImageOutline } from "assets/icons";

type ImagePreviewProps = {
  previewUrl: string;
};

export const ImagePreview = ({ previewUrl }: ImagePreviewProps) => {
  if (!previewUrl) {
    return (
      <div className={s.imageEmpty}>
        <ImageOutline width={48} height={48} />
      </div>
    );
  }

  return (
    <div className={s.previewContainer}>
      <Image className={s.mainImage} src={previewUrl} alt="Main Preview" priority width={332} height={340} />
    </div>
  );
};
