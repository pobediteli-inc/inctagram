import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import s from "./imagePreview.module.css";
import "swiper/css";
import { Close, ImageOutline } from "../../../assets/icons";

type ImagePreviewProps = {
  previewUrls: string[];
  mainImageIndex: number;
  setMainImageIndex: (index: number) => void;
  handleRemoveImage: (index: number) => void;
};

export const ImagePreview = ({
  previewUrls,
  mainImageIndex,
  setMainImageIndex,
  handleRemoveImage,
}: ImagePreviewProps) => {
  if (previewUrls.length === 0) {
    return (
      <div className={s.previewContainerEmpty}>
        <div className={s.imageEmpty}>
          <ImageOutline width={48} height={48} />
        </div>
      </div>
    );
  }

  return (
    <div className={s.previewContainer}>
      <Image
        className={s.mainImage}
        src={previewUrls[mainImageIndex]}
        alt="Main Preview"
        priority
        width={400}
        height={400}
      />
      {previewUrls.length > 1 && (
        <Swiper spaceBetween={10} slidesPerView={3} className={s.carousel}>
          {previewUrls.map((url, index) => (
            <SwiperSlide key={index}>
              <div className={s.previewImageContainer}>
                <Image
                  className={s.previewImage}
                  src={url}
                  alt={`Preview ${index + 1}`}
                  width={100}
                  height={100}
                  onClick={() => setMainImageIndex(index)}
                />
                <button className={s.removeBtn} onClick={() => handleRemoveImage(index)}>
                  <Close width={12} height={12} />
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};
