import React, { ComponentPropsWithRef, useCallback, useEffect, useState } from "react";
import { EmblaCarouselType } from "embla-carousel";
import { ArrowIosBackOutline, ArrowIosForwardOutline } from "assets/icons";

type UsePrevNextButtonsType = {
  prevBtnDisabled: boolean;
  nextBtnDisabled: boolean;
  onPrevButtonClick: () => void;
  onNextButtonClick: () => void;
};

export const usePrevNextButtons = (emblaApi: EmblaCarouselType | undefined): UsePrevNextButtonsType => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onSelect]);

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  };
};

type Props = ComponentPropsWithRef<"button">;

export const PrevButton = ({ children, ...restProps }: Props) => {
  return (
    <button type="button" {...restProps}>
      <ArrowIosBackOutline width={48} height={48} />
      {children}
    </button>
  );
};

export const NextButton = ({ children, ...restProps }: Props) => {
  return (
    <button type="button" {...restProps}>
      <ArrowIosForwardOutline width={48} height={48} />
      {children}
    </button>
  );
};
