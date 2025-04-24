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
  handleRemoveImage: (index: number) => void;
};

export const ImagePreview = ({
  previewUrls,
  mainImageIndex,
  setMainImageIndex,
  handleRemoveImage,
}: ImagePreviewProps) => {
  const mainImageUrl = previewUrls[mainImageIndex];

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

  if (previewUrls.length === 0 || !mainImageUrl) {
    return (
      <div className={s.imageEmpty}>
        <ImageOutline width={48} height={48} />
      </div>
    );
  }

  return (
    <div className={s.previewContainer}>
      <div className={s.mainImageWrapper}>
        <Image className={s.mainImage} src={mainImageUrl} alt="Main Preview" priority width={400} height={400} />
      </div>

      {previewUrls.length > 1 && (
        <div className={s.carouselWrapper}>
          <button className={s.arrow + " " + s.leftArrow} onClick={() => emblaApi?.scrollPrev()}>
            <ChevronLeft size={20} />
          </button>

          <div className={s.embla} ref={emblaRef}>
            <div className={s.emblaContainer}>
              {previewUrls.map((url, index) => (
                <div className={s.emblaSlide} key={index}>
                  <div
                    className={`${s.previewImageContainer} ${index === mainImageIndex ? s.active : ""}`}
                    onClick={() => setMainImageIndex(index)}
                  >
                    <Image className={s.previewImage} src={url} alt={`Preview ${index + 1}`} width={100} height={100} />
                    <button className={s.removeBtn} onClick={() => handleRemoveImage(index)}>
                      <Close width={12} height={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className={s.arrow + " " + s.rightArrow} onClick={() => emblaApi?.scrollNext()}>
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
};
