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

  if (!images || images.length === 0)
    return (
      <Typography variant={"h2"} color={"light"} textAlign={"center"}>
        No images
      </Typography>
    );

  const handlePreview = () => setImageIndex((prevState) => (prevState === 0 ? images?.length - 1 : prevState - 1));
  const handleNext = () => setImageIndex((prevState) => (prevState === images?.length - 1 ? 0 : prevState + 1));

  return (
    <div className={clsx(s.mainWrapper, { [s.collapsed]: isCollapsed })}>
      <Image
        key={imageIndex}
        className={s.avatars}
        src={images[imageIndex].url}
        alt={images[imageIndex].uploadId}
        width={images[imageIndex].width}
        height={images[imageIndex].height}
      />
      {images && images?.length > 1 && (
        <>
          <ArrowIosBackOutline className={s.arrowLeft} onClick={handlePreview} />
          <ArrowIosForwardOutline className={s.arrowRight} onClick={handleNext} />
          <div className={s.pagination}>
            {images.map((_, index) => (
              <Button
                key={index}
                variant={"primary"}
                className={clsx(s.whiteDot, { [s.blueDot]: imageIndex === index })}
                onClick={() => setImageIndex(index)}
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
