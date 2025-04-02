"use client";

import s from "./createPage.module.css";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Card, Typography } from "../../common/components";
import { Close, ImageOutline } from "../../assets/icons";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { useUploadImagePostMutation } from "../../store/services/posts/postsApi";
import "swiper/css";

export default function CreatePage() {
  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [mainImageIndex, setMainImageIndex] = useState<number>(0);
  const [descriptions, setDescriptions] = useState<string[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);
  const router = useRouter();
  const [uploadImagePost, { isLoading }] = useUploadImagePostMutation();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const onCloseHandler = () => {
    router.push("/home");
  };

  const MAX_IMAGES = 4;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      if (images.length + filesArray.length > MAX_IMAGES) {
        alert(`You can upload up to ${MAX_IMAGES} images.`);
        return;
      }

      const validFormats = ["image/jpeg", "image/png"];
      const newFiles: File[] = [];
      const newUrls: string[] = [];
      const newDescriptions: string[] = [];

      filesArray.forEach((file) => {
        if (!validFormats.includes(file.type)) {
          alert("Accepted formats: JPEG, PNG");
          return;
        }
        if (file.size > 20 * 1024 * 1024) {
          alert("The file is too large! Maximum size is 20 MB.");
          return;
        }
        newFiles.push(file);
        newUrls.push(URL.createObjectURL(file));
        newDescriptions.push("");
      });

      setImages((prev) => [...prev, ...newFiles]);
      setPreviewUrls((prev) => [...prev, ...newUrls]);
      setDescriptions((prev) => [...prev, ...newDescriptions]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
    setDescriptions((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSelectMainImage = (index: number) => {
    setMainImageIndex(index);
  };

  const handleNextClick = () => {
    setShowForm(true);
  };

  const handleDescriptionChangeForImage = (index: number, value: string) => {
    setDescriptions((prev) => {
      const newDescriptions = [...prev];
      newDescriptions[index] = value;
      return newDescriptions;
    });
  };

  const handleSubmit = async () => {
    if (images.length === 0) {
      alert("Add at least one photo");
      return;
    }

    const formData = new FormData();
    images.forEach((image, index) => {
      formData.append("images", image);
      formData.append(`descriptions[${index}]`, descriptions[index] || "");
    });

    // Создаем структуру данных для отправки
    const imagesToUpload = images.map((image, index) => ({
      url: previewUrls[index],
      fileSize: image.size,
      createdAt: new Date().toISOString(),
      width: 500,
      height: 500,
      uploadId: `${Date.now()}-${index}`,
    }));

    try {
      const response = await uploadImagePost({ images: imagesToUpload }).unwrap();

      if (response) {
        alert("Photos uploaded successfully!");
        setImages([]);
        setPreviewUrls([]);
        setDescriptions([]);
        setShowForm(false);
        router.push("/home");
      } else {
        alert("Loading error. Try again.");
      }
    } catch (error) {
      console.error("Error uploading to server.", error);
      alert("Error uploading to server.");
    }
  };

  return (
    <div className={s.popUp}>
      <Card>
        {!showForm ? (
          <div className={s.modalWrapper}>
            <div>
              {previewUrls.length > 0 ? (
                <div className={s.headerDataButtons}>
                  <div className={s.popUpHeader}>
                    <Typography variant={"h2"} color={"light"}>
                      Edit Photos
                    </Typography>
                    <button className={s.closeBtn} onClick={onCloseHandler}>
                      <Close width={24} height={24} />
                    </button>
                  </div>

                  <div className={s.previewContainer}>
                    <Image
                      className={s.mainImage}
                      src={previewUrls[mainImageIndex]}
                      alt="Main Preview"
                      priority
                      width={400}
                      height={400}
                    />
                    {previewUrls.length > 1 && (
                      <Swiper spaceBetween={10} slidesPerView={3} className={s.carousel}>
                        {previewUrls.map((url, index) => (
                          <SwiperSlide key={index}>
                            <div className={s.previewImageContainer}>
                              <Image
                                className={s.previewImage}
                                src={url}
                                alt={`Preview ${index + 1}`}
                                width={100}
                                height={100}
                                onClick={() => handleSelectMainImage(index)}
                              />
                              <button className={s.removeBtn} onClick={() => handleRemoveImage(index)}>
                                <Close width={12} height={12} />
                              </button>
                            </div>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    )}
                  </div>

                  <div className={s.btnGroup}>
                    <Button
                      className={s.btnForm}
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      Select from Computer
                    </Button>
                    <Button className={s.btnForm} type="button" variant={"outlined"} onClick={handleNextClick}>
                      Next
                    </Button>
                  </div>
                </div>
              ) : (
                <div className={s.headerDataButtons}>
                  <div className={s.popUpHeader}>
                    <Typography variant={"h2"} color={"light"}>
                      Add Photos
                    </Typography>
                    <button className={s.closeBtn} onClick={onCloseHandler}>
                      <Close width={24} height={24} />
                    </button>
                  </div>

                  <div className={s.previewContainerEmpty}>
                    <div className={s.imageEmpty}>
                      <ImageOutline width={48} height={48} />
                    </div>
                  </div>

                  <div className={s.btnGroup}>
                    <Button
                      className={s.btnForm}
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      Select from Computer
                    </Button>
                    <Button className={s.btnForm} type="button" variant={"outlined"} onClick={handleNextClick}>
                      Open Draft
                    </Button>
                  </div>
                </div>
              )}
            </div>

            <div className={s.fileInputWrapper}>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                id="photo-upload"
                ref={fileInputRef}
                className={s.fileUpload}
                style={{ display: "none" }}
              />
            </div>
          </div>
        ) : (
          <div className={s.formContainer}>
            <div className={s.popUpHeader}>
              <Typography variant={"h2"} color={"light"}>
                Publication
              </Typography>
              <button className={s.closeBtn} onClick={onCloseHandler}>
                <Close width={24} height={24} />
              </button>
            </div>

            {previewUrls.map((_, index) => (
              <div key={index} className={s.descriptionField}>
                <Typography variant={"regular_14"}>Add publication descriptions {index + 1}:</Typography>
                <textarea
                  className={s.textarea}
                  value={descriptions[index]}
                  onChange={(e) => handleDescriptionChangeForImage(index, e.target.value)}
                />
              </div>
            ))}

            <div className={s.btnGroup}>
              <Button className={s.btnForm} type="button" onClick={handleSubmit} disabled={isLoading}>
                {isLoading ? "Uploading..." : "Submit"}
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
