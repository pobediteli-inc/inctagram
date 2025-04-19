import React from "react";
import { EmblaOptionsType } from "embla-carousel";
import { DotButton, useDotButton } from "./carouselDotButton";
import { PrevButton, NextButton, usePrevNextButtons } from "./carouselArrowButtons";
import useEmblaCarousel from "embla-carousel-react";
import s from "./carousel.module.css";
import { Image as ApiImage } from "store/services/api/posts";
import Image from "next/image";
import { clsx } from "clsx";

type Props = {
  slides: ApiImage[];
  options?: EmblaOptionsType;
  width?: number;
  height?: number;
};

export const Carousel = ({ slides, options, width = 490, height = 562 }: Props) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);
  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);

  return (
    <section
      className={s.embla}
      style={
        {
          "--slide-width": `${width}px`,
          "--slide-height": `${height}px`,
        } as React.CSSProperties
      }
    >
      <div className={s.viewportWrapper}>
        <div className={s.viewport} ref={emblaRef}>
          <div className={s.container}>
            {slides.map((image, index) => (
              <div className={s.slide} key={index}>
                <Image
                  src={image.url}
                  alt="Photo preview"
                  width={width}
                  height={height}
                  style={{ objectFit: "cover" }}
                />
              </div>
            ))}
          </div>
        </div>
        {slides.length > 1 && (
          <>
            <div className={s.arrowLeft}>
              <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
            </div>
            <div className={s.arrowRight}>
              <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
            </div>

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
