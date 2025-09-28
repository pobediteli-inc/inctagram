import React from "react";
import Image from "next/image";
import s from "./imagePreview.module.css";
import { CloseOutline, ImageOutline, PlusCircleOutline } from "assets/icons";
import { Button, Carousel } from "common/components";
import clsx from "clsx";

type ImagePreviewProps = {
  previewUrls: string[];
  mainImageIndex: number;
  setMainImageIndex: (index: number) => void;
  handleRemoveImage: (index: number, e: React.MouseEvent<HTMLButtonElement>) => void;
  onSelectClickHandler: () => void;
};

export const ImagePreview = ({
  previewUrls,
  mainImageIndex,
  setMainImageIndex,
  handleRemoveImage,
  onSelectClickHandler,
}: ImagePreviewProps) => {
  const mainImageUrl = previewUrls[mainImageIndex] ?? previewUrls[0];

  if (previewUrls.length === 0 || !mainImageUrl) {
    return (
      <div className={s.imageEmpty}>
        <ImageOutline width={48} height={48} />
      </div>
    );
  }

  return (
    <div className={s.previewContainer}>
      <Carousel slides={previewUrls} scrollToIndex={mainImageIndex} onImageSelect={setMainImageIndex} height={504} />

      <div className={s.thumbnailsContainer}>
        {previewUrls.map((url, index) => (
          <div className={s.previewThumbnail} key={index}>
            <div
              className={clsx(s.previewImageContainer, {
                [s.active]: index === mainImageIndex,
              })}
              onClick={() => setMainImageIndex(index)}
            >
              <Image className={s.previewImage} src={url} alt={`Preview ${index + 1}`} width={100} height={100} />
              <button onClick={(e) => handleRemoveImage(index, e)} className={s.removeBtn}>
                <CloseOutline width={12} height={12} />
              </button>
            </div>
          </div>
        ))}
        <Button type="button" variant="link" onClick={onSelectClickHandler} className={s.addBtn}>
          <PlusCircleOutline width={36} height={36} />
        </Button>
      </div>
    </div>
  );
};
