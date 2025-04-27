import s from "./uploadedPhotos.module.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { Typography } from "../../../../common/components";
import React, { useState } from "react";

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
            {canGoPrev && (
              <button className={s.arrowLeft} onClick={handlePrev}>
                <ChevronLeft size={24} />
              </button>
            )}

            <Image
              src={previewUrls[currentIndex]}
              alt={`Preview ${currentIndex + 1}`}
              width={500}
              height={500}
              className={s.previewImage}
            />

            {canGoNext && (
              <button className={s.arrowRight} onClick={handleNext}>
                <ChevronRight size={24} />
              </button>
            )}

            <div className={s.carouselDotsWrapper}>
              <div className={s.carouselDots}>
                {previewUrls.map((_, index) => (
                  <button
                    key={index}
                    className={`${s.dot} ${index === currentIndex ? s.activeDot : ""}`}
                    onClick={() => setCurrentIndex(index)}
                  />
                ))}
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
