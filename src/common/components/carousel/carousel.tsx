"use client";

import { CSSProperties, SyntheticEvent, useEffect, useState } from "react";
import { EmblaOptionsType } from "embla-carousel";
import { DotButton, useDotButton } from "./carouselDotButton";
import { NextButton, PrevButton, usePrevNextButtons } from "./carouselArrowButtons";
import useEmblaCarousel from "embla-carousel-react";
import s from "./carousel.module.css";
import Image from "next/image";
import { clsx } from "clsx";

type Props = {
  slides: string[];
  options?: EmblaOptionsType;
  width?: number;
  height?: number;
  initialIndex?: number;
  onImageSelect?: (index: number) => void;
  scrollToIndex?: number;
};

export const Carousel = ({
  slides,
  options,
  width = 490,
  height = 562,
  initialIndex,
  onImageSelect,
  scrollToIndex,
}: Props) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);
  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);

  useEffect(() => {
    if (!emblaApi) return;

    if (initialIndex !== undefined) {
      emblaApi.scrollTo(initialIndex, true);
    }

    const onSelect = () => {
      const index = emblaApi.selectedScrollSnap();
      onImageSelect?.(index);
    };

    emblaApi.on("select", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, initialIndex, onImageSelect]);

  useEffect(() => {
    if (!emblaApi || scrollToIndex === undefined) return;
    emblaApi.scrollTo(scrollToIndex);
  }, [emblaApi, scrollToIndex]);

  const [showBlurArray, setShowBlurArray] = useState<boolean[]>(() => Array(slides.length).fill(false));

  const handleImageLoad = (e: SyntheticEvent<HTMLImageElement>, index: number) => {
    const img = e.currentTarget;
    const imageRatio = img.naturalWidth / img.naturalHeight;
    const containerRatio = width / height;

    if (Math.abs(imageRatio - containerRatio) > 0.01) {
      setShowBlurArray((prev) => {
        const updated = [...prev];
        updated[index] = true;
        return updated;
      });
    }
  };

  return (
    <section
      className={s.embla}
      style={
        {
          "--slide-width": `${width}px`,
          "--slide-height": `${height}px`,
        } as CSSProperties
      }
    >
      <div className={s.viewportWrapper}>
        <div className={s.viewport} ref={emblaRef}>
          <div className={s.container}>
            {slides.map((slideUrl, index) => (
              <div className={s.slide} key={index}>
                <div className={s.blurredWrapper}>
                  {showBlurArray[index] && (
                    <div className={s.blurredBackground}>
                      <Image src={slideUrl} alt="Blurred background" fill className={s.blurredImage} priority />
                    </div>
                  )}
                  <Image
                    src={slideUrl}
                    alt="Photo preview"
                    width={width}
                    height={height}
                    style={{ objectFit: "contain", zIndex: 1 }}
                    onLoad={(e) => handleImageLoad(e, index)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {slides.length > 1 && (
          <>
            {!prevBtnDisabled && <PrevButton onClick={onPrevButtonClick} className={s.arrowLeft} />}
            {!nextBtnDisabled && <NextButton onClick={onNextButtonClick} className={s.arrowRight} />}

            <div className={s.dotsOverlay}>
              {scrollSnaps.map((_, index) => (
                <DotButton
                  key={index}
                  onClick={() => onDotButtonClick(index)}
                  className={clsx(s.dot, index === selectedIndex && s.dot__selected)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};
