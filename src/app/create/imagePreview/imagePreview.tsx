import React, { useEffect } from "react";
import Image from "next/image";
import s from "./imagePreview.module.css";
import { Close, ImageOutline } from "assets/icons";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", containScroll: "trimSnaps" });

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.scrollTo(mainImageIndex);

    const onSelect = () => {
      const index = emblaApi.selectedScrollSnap();
      setMainImageIndex(index);
    };

    emblaApi.on("select", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, mainImageIndex, setMainImageIndex]);

  const renderMainImage = () => (
    <div className={s.mainImageWrapper}>
      {mainImageIndex > 0 && (
        <button className={`${s.arrow} ${s.leftArrowOverlay}`} onClick={() => setMainImageIndex(mainImageIndex - 1)}>
          <ChevronLeft size={24} />
        </button>
      )}

      <Image className={s.mainImage} src={mainImageUrl} alt="Main Preview" priority width={400} height={400} />

      {mainImageIndex < previewUrls.length - 1 && (
        <button className={`${s.arrow} ${s.rightArrowOverlay}`} onClick={() => setMainImageIndex(mainImageIndex + 1)}>
          <ChevronRight size={24} />
        </button>
      )}
    </div>
  );

  const renderCarousel = () => (
    <div className={s.carouselWrapper}>
      <div className={s.embla} ref={emblaRef}>
        <div className={s.emblaContainer}>
          {previewUrls.map((url, index) => (
            <div className={s.emblaSlide} key={index}>
              <div
                className={`${s.previewImageContainer} ${index === mainImageIndex ? s.active : ""}`}
                onClick={() => setMainImageIndex(index)}
              >
                <Image className={s.previewImage} src={url} alt={`Preview ${index + 1}`} width={100} height={100} />
                <button className={s.removeBtn} onClick={(e) => handleRemoveImage(index, e)}>
                  <Close width={12} height={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={s.btnGroup}>
        <button className={s.btnAddPhoto} onClick={onSelectClickHandler}>
          +
        </button>
      </div>
    </div>
  );

  if (previewUrls.length === 0 || !mainImageUrl) {
    return (
      <div className={s.imageEmpty}>
        <ImageOutline width={48} height={48} />
      </div>
    );
  }

  return (
    <div className={s.previewContainer}>
      {renderMainImage()}
      {renderCarousel()}
    </div>
  );
};
