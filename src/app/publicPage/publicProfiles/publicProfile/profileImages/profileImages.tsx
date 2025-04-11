"use client";

import s from "./ProfileImages.module.css";
import { ImagesArgs } from "store/services/api/publicPosts";
import { FC, useState } from "react";
import Image from "next/image";
import ArrowIosBackOutline from "assets/icons/ArrowIosBackOutline";
import ArrowIosForwardOutline from "assets/icons/ArrowIosForwardOutline";
import { Button, Typography } from "common/components";
import clsx from "clsx";

export const ProfileImages: FC<Props> = ({ images, isCollapsed }) => {
  const [imageIndex, setImageIndex] = useState<number>(0);
  const [visibleButtonIndex, setVisibleButtonIndex] = useState<number>(0);
  const MAX_BUTTONS = 5;

  if (!images || images.length === 0)
    return (
      <Typography variant={"h2"} color={"light"} textAlign={"center"}>
        No images
      </Typography>
    );

  const updatePagination = (newButtonIndex: number) => {
    if (images.length <= MAX_BUTTONS) return;

    const currentButton = Math.floor(MAX_BUTTONS / 2);
    let newIndex = newButtonIndex - currentButton;

    if (newIndex < 0) newIndex = 0;
    if (newIndex + MAX_BUTTONS > images.length) newIndex = images.length - MAX_BUTTONS;

    setVisibleButtonIndex(newIndex);
  };
  const handlePreview = () =>
    setImageIndex((prevState) => {
      const index = prevState === 0 ? images?.length - 1 : prevState - 1;
      updatePagination(index);
      return index;
    });
  const handleNext = () =>
    setImageIndex((prevState) => {
      const index = prevState === images?.length - 1 ? 0 : prevState + 1;
      updatePagination(index);
      return index;
    });
  const handlePaginationButton = (currentIndex: number) => {
    setImageIndex(currentIndex);
    updatePagination(currentIndex);
  };

  const visibleButtons = images.slice(visibleButtonIndex, visibleButtonIndex + MAX_BUTTONS);

  return (
    <div className={clsx(s.mainWrapper, { [s.collapsed]: isCollapsed })}>
      <Image
        key={imageIndex}
        className={s.avatars}
        src={images[imageIndex].url}
        alt={images[imageIndex].uploadId}
        width={images[imageIndex].width}
        height={images[imageIndex].height}
        priority
      />
      {images && images?.length > 1 && (
        <>
          <ArrowIosBackOutline className={s.arrowLeft} onClick={handlePreview} />
          <ArrowIosForwardOutline className={s.arrowRight} onClick={handleNext} />
          <div className={s.pagination}>
            {visibleButtons.map((_, index) => (
              <Button
                key={visibleButtonIndex + index}
                className={clsx(s.whiteDot, { [s.blueDot]: imageIndex === visibleButtonIndex + index })}
                onClick={() => handlePaginationButton(visibleButtonIndex + index)}
              ></Button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

type Props = {
  images?: ImagesArgs[];
  isCollapsed?: boolean;
};
