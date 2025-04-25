import { useState } from "react";

export const useImageManager = () => {
  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [mainImageIndex, setMainImageIndex] = useState<number>(0);

  const addImages = (files: File[], onError: (msg: string) => void) => {
    const MAX_IMAGES = 10;
    const validFormats = ["image/jpeg", "image/png"];
    const newFiles: File[] = [];
    const newUrls: string[] = [];

    for (const file of files) {
      if (!validFormats.includes(file.type)) {
        onError("Accepted formats: JPEG, PNG");
        continue;
      }
      if (file.size > 20 * 1024 * 1024) {
        onError("The photo must be less than 20 Mb and have JPEG or PNG format");
        continue;
      }
      newFiles.push(file);
      newUrls.push(URL.createObjectURL(file));
    }

    if (images.length + newFiles.length > MAX_IMAGES) {
      onError(`You can upload up to ${MAX_IMAGES} images.`);
      return;
    }

    setImages((prev) => [...prev, ...newFiles]);
    setPreviewUrls((prev) => [...prev, ...newUrls]);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
    setMainImageIndex((prev) => {
      if (index < prev) return prev - 1;
      if (index === prev) return Math.max(0, prev - 1);
      return prev;
    });
  };

  const reset = () => {
    setImages([]);
    setPreviewUrls([]);
    setMainImageIndex(0);
  };

  return {
    images,
    previewUrls,
    mainImageIndex,
    setMainImageIndex,
    addImages,
    removeImage,
    reset,
  };
};
