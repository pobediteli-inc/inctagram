import s from "./ProfileImages.module.css";
import { ImagesArgs } from "store/services/api/publicPosts";
import { FC } from "react";
import Image from "next/image";

export const ProfileImages: FC<Props> = ({ images }) => {
  const image =
    images?.map((image, index) => (
      <Image
        key={index}
        className={s.avatar}
        src={image.url}
        alt={image.uploadId}
        width={image.width}
        height={image.height}
      />
    )) || "No images";

  return <div className={s.mainWrapper}>{image}</div>;
};

type Props = {
  images?: ImagesArgs[];
};
