import React, { useState } from "react";
import s from "./descriptionStep.module.css";
import { Close } from "assets/icons";
import { Button, Textarea, Typography } from "common/components";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

type DescriptionStepProps = {
  description: string;
  setDescription: (value: string) => void;
  onCloseHandler: () => void;
  onBack: () => void;
  onSubmit: () => void;
  isLoading: boolean;
  previewUrls: string[];
};

export const DescriptionStep = ({
  description,
  setDescription,
  onCloseHandler,
  onBack,
  onSubmit,
  isLoading,
  previewUrls,
}: DescriptionStepProps) => {
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
    <div className={s.modalWrapper}>
      <div className={s.popUpHeader}>
        <Typography variant="h2" color="light">
          Publication
        </Typography>
        <Button className={s.closeBtn} onClick={onCloseHandler}>
          <Close width={24} height={24} />
        </Button>
      </div>

      <div className={s.photosAndDescription}>
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
              </div>
            </div>
          ) : (
            <Typography variant="regular_14">No images uploaded</Typography>
          )}
        </div>

        <div className={s.formContainer}>
          <div className={s.descriptionField}>
            <Typography variant="regular_14">Add description:</Typography>
            <Textarea
              title="Description"
              className={s.textarea}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className={s.btnGroup}>
            <Button className={s.btnForm} type="button" onClick={onBack} disabled={isLoading}>
              Prev step
            </Button>
            <Button className={s.btnForm} type="button" onClick={onSubmit} disabled={isLoading}>
              {isLoading ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
