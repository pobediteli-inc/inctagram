import s from "./uploadedPhotos.module.css";
import { Carousel, Typography } from "common/components";
import React from "react";

type UploadedPhotosProps = {
  previewUrls: string[];
};

export const UploadedPhotos = ({ previewUrls }: UploadedPhotosProps) => {
  const hasPhotos = previewUrls.length > 0;

  return (
    <div className={s.uploadedPhotos}>
      {hasPhotos ? (
        <div className={s.carouselWrapper}>
          <div className={s.imageWrapper}>
            <Carousel
              slides={previewUrls}
              width={500}
              height={504}
              options={{
                align: "center",
                loop: false,
                skipSnaps: false,
              }}
            />
          </div>
        </div>
      ) : (
        <Typography variant="regular_14">No images uploaded</Typography>
      )}
    </div>
  );
};
