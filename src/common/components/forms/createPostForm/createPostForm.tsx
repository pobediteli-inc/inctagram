"use client";

import React, { useState } from "react";
import s from "./createPostForm.module.css";
import { Button, Card, Typography } from "../../index";
import { Close, ImageOutline } from "../../../../assets/icons";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useUploadImagePostMutation } from "../../../../store/services/posts/postsApi";

type CreatePostFormProps = {
  onClose: () => void;
};

const CreatePostForm: React.FC<CreatePostFormProps> = ({ onClose }) => {
  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [mainImageIndex, setMainImageIndex] = useState<number>(0);
  const [descriptions, setDescriptions] = useState<string[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false); // Показывать форму

  const [uploadImagePost, { isLoading }] = useUploadImagePostMutation(); // Делаем запрос

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const validFormats = ["image/jpeg", "image/png"];
      const newFiles: File[] = [];
      const newUrls: string[] = [];
      const newDescriptions: string[] = [];

      filesArray.forEach(file => {
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
        newDescriptions.push(""); // Создаем пустое описание для каждого фото
      });

      setImages(prev => [...prev, ...newFiles]);
      setPreviewUrls(prev => [...prev, ...newUrls]);
      setDescriptions(prev => [...prev, ...newDescriptions]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
    setDescriptions(prev => prev.filter((_, i) => i !== index));
  };

  const handleSelectMainImage = (index: number) => {
    setMainImageIndex(index);
  };

  const handleNextClick = () => {
    setShowForm(true);
  };

  const handleDescriptionChangeForImage = (index: number, value: string) => {
    setDescriptions(prev => {
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
      url: previewUrls[index],  // URL превью изображения
      fileSize: image.size,  // Размер файла
      createdAt: new Date().toISOString(), // Время создания
      width: 500, // Пример, замените по необходимости
      height: 500, // Пример, замените по необходимости
      uploadId: `${Date.now()}-${index}`, // Уникальный ID загрузки
    }));

    try {
      const response = await uploadImagePost({ images: imagesToUpload }).unwrap();

      if (response) {
        alert("Photos uploaded successfully!");
        setImages([]);
        setPreviewUrls([]);
        setDescriptions([]);
        setShowForm(false);
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
      <Card className={s.card}>
        <div className={s.popUpHeader}>
          <Typography variant={"h2"} color={"light"}>Add Photos</Typography>
          <button className={s.closeBtn} onClick={onClose}>
            <Close width={24} height={24} />
          </button>
        </div>

        <div className={s.modalWrapper}>
          {!showForm ? (
            <>
              <div className={s.imageWrapper}>
                {previewUrls.length > 0 ? (
                  <div className={s.previewContainer}>
                    <Image
                      className={s.mainImage}
                      src={previewUrls[mainImageIndex]}
                      alt="Main Preview"
                      priority
                      width={500}
                      height={500}
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
                ) : (
                  <div className={s.imageEmpty}>
                    <ImageOutline width={48} height={48} />
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
                  className={s.fileUpload}
                  style={{ display: "none" }}
                />

                <div className={s.btnGroup}>
                  <Button className={s.btnForm} type="button" onClick={() => document.getElementById("photo-upload")?.click()}>
                    Select from Computer
                  </Button>
                  <Button className={s.btnForm} type="button" variant={"outlined"} onClick={handleNextClick}>
                    Next
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className={s.formContainer}>
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
              <Button className={s.btnForm} type="button" onClick={handleSubmit} disabled={isLoading}>
                {isLoading ? "Uploading..." : "Submit"}
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default CreatePostForm;
