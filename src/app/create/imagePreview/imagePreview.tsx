import React, { useEffect } from "react";
import Image from "next/image";
import s from "./imagePreview.module.css";
import { ArrowIosBack, ArrowIosForward, CloseOutline, ImageOutline, PlusCircleOutline } from "assets/icons";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "../../../common/components";

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

  const canGoPrev = mainImageIndex > 0;
  const canGoNext = mainImageIndex < previewUrls.length - 1;

  const handlePrev = () => setMainImageIndex(mainImageIndex - 1);
  const handleNext = () => setMainImageIndex(mainImageIndex + 1);

  const renderMainImage = () => (
    <div className={s.mainImageWrapper}>
      <div className={s.blurredBackground}>
        <Image src={mainImageUrl} alt="blurred bg" fill className={s.blurredImage} />
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

      <Image className={s.mainImage} src={mainImageUrl} alt="Main Preview" priority width={400} height={400} />

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
    </div>
  );

  const renderCarousel = () => (
    <div className={s.carouselWrapper}>
      <div className={s.embla} ref={emblaRef}>
        <div className={s.emblaContainer}>
          {previewUrls.map((url, index) => {
            const handleRenderCarousel = () => setMainImageIndex(index);
            const onRemoveImageClick = (e: React.MouseEvent<HTMLButtonElement>) => handleRemoveImage(index, e);
            return (
              <div className={s.emblaSlide} key={index}>
                <div
                  className={`${s.previewImageContainer} ${index === mainImageIndex ? s.active : ""}`}
                  onClick={handleRenderCarousel}
                >
                  <Image className={s.previewImage} src={url} alt={`Preview ${index + 1}`} width={100} height={100} />
                  <button onClick={onRemoveImageClick} className={s.removeBtn}>
                    <CloseOutline width={12} height={12} />
                  </button>
                </div>
              </div>
            );
          })}{" "}
        </div>
      </div>

      <div className={s.btnGroup}>
        <Button type="button" variant="link" onClick={onSelectClickHandler} style={{ color: "var(--light-100)" }}>
          <PlusCircleOutline width={36} height={36} />
        </Button>
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
