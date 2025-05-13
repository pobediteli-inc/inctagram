import s from "./uploadedPhotos.module.css";
import Image from "next/image";
import { Button, Typography } from "../../../../common/components";
import React, { useState } from "react";
import { ArrowIosBack, ArrowIosForward } from "../../../../assets/icons";

type UploadedPhotosProps = {
  previewUrls: string[];
};

export const UploadedPhotos = ({ previewUrls }: UploadedPhotosProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const hasPhotos = previewUrls.length > 0;
  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < previewUrls.length - 1;

  const handlePrev = () => {
    if (canGoPrev) setCurrentIndex(currentIndex - 1);
  };

  const handleNext = () => {
    if (canGoNext) setCurrentIndex(currentIndex + 1);
  };

  return (
    <div className={s.uploadedPhotos}>
      {hasPhotos ? (
        <div className={s.carouselWrapper}>
          <div className={s.imageWrapper}>
            <div className={s.blurredBackground}>
              <Image src={previewUrls[currentIndex]} alt="Blurred preview" fill className={s.blurredImage} />
            </div>

            {canGoPrev && (
              <Button
                type={"button"}
                variant={"secondary"}
                onClick={handlePrev}
                className={`${s.arrowOverlay} ${s.arrowOverlayLeft}`}
              >
                <ArrowIosBack width={24} height={24} />
              </Button>
            )}

            <Image
              src={previewUrls[currentIndex]}
              alt={`Preview ${currentIndex + 1}`}
              width={500}
              height={500}
              className={s.previewImage}
            />

            {canGoNext && (
              <Button
                type={"button"}
                variant={"secondary"}
                onClick={handleNext}
                className={`${s.arrowOverlay} ${s.arrowOverlayRight}`}
              >
                <ArrowIosForward width={24} height={24} />
              </Button>
            )}

            <div className={s.carouselDotsWrapper}>
              <div className={s.carouselDots}>
                {previewUrls.map((_, index) => {
                  const handleCarousel = () => setCurrentIndex(index);
                  return (
                    <button
                      key={index}
                      className={`${s.dot} ${index === currentIndex ? s.activeDot : ""}`}
                      onClick={handleCarousel}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Typography variant="regular_14">No images uploaded</Typography>
      )}
    </div>
  );
};
