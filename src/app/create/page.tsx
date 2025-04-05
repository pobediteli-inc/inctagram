"use client";

import s from "./createPage.module.css";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Card, Typography } from "../../common/components";
import { Close, ImageOutline } from "../../assets/icons";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import {
  useCreatePostMutation,
  useUploadImagePostMutation,
} from "../../store/services/posts/postsApi";
import "swiper/css";
import { Textarea } from "../../common/components/textarea/textarea";
import { Toast } from "../../common/components/toast/toast";
import { CloseNotificationPopUp } from "./closeNotificationPopUp/closeNotificationPopUp";

export default function CreatePage() {
  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [mainImageIndex, setMainImageIndex] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [showForm, setShowForm] = useState<boolean>(false);
  const [showCloseNotification, setShowCloseNotification] = useState<boolean>(false); // State for controlling CloseNotificationPopUp
  const router = useRouter();
  const [uploadImagePost, { isLoading: isUploading }] = useUploadImagePostMutation();
  const [createPost, { isLoading: isCreating }] = useCreatePostMutation();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [toast, setToast] = useState<{
    type: "success" | "error" | "warning";
    message: string;
    open: boolean;
  } | null>(null);

  const onCloseHandler = () => {
    setShowCloseNotification(true);
  };

  const handleCloseNotification = (action: "discard" | "save") => {
    if (action === "discard") {
      setImages([]);
      setPreviewUrls([]);
      setDescription("");
      setShowForm(false);
    }
    setShowCloseNotification(false);
    router.push("/home");
  };

  const MAX_IMAGES = 10;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      if (images.length + filesArray.length > MAX_IMAGES) {
        setToast({ type: "warning", message: `You can upload up to ${MAX_IMAGES} images.`, open: true });
        return;
      }

      const validFormats = ["image/jpeg", "image/png"];
      const newFiles: File[] = [];
      const newUrls: string[] = [];

      filesArray.forEach((file) => {
        if (!validFormats.includes(file.type)) {
          setToast({ type: "error", message: "Accepted formats: JPEG, PNG", open: true });
          return;
        }
        if (file.size > 20 * 1024 * 1024) {
          setToast({ type: "error", message: "The file is too large! Maximum size is 20 MB.", open: true });
          return;
        }
        newFiles.push(file);
        newUrls.push(URL.createObjectURL(file));
      });

      setImages((prev) => [...prev, ...newFiles]);
      setPreviewUrls((prev) => [...prev, ...newUrls]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSelectMainImage = (index: number) => {
    setMainImageIndex(index);
  };

  const handleNextClick = () => {
    setShowForm(true);
  };

  const handlePrevClick = () => {
    setShowForm(false);
  };

  const handleSubmit = async () => {
    if (images.length === 0) {
      setToast({ type: "warning", message: "Add at least one photo", open: true });
      return;
    }

    try {
      const uploadResult = await uploadImagePost({ files: images }).unwrap();

      if (!uploadResult || !Array.isArray(uploadResult.images)) {
        setToast({ type: "error", message: "Image upload failed. Try again.", open: true });
        return;
      }

      const childrenMetadata = uploadResult.images.map((item, index) => ({
        uploadId: item.uploadId,
        isMain: index === mainImageIndex,
      }));

      const { postId } = await createPost({ description, childrenMetadata }).unwrap();

      setToast({ type: "success", message: "Post created successfully!", open: true });
      setImages([]);
      setPreviewUrls([]);
      setDescription("");
      setShowForm(false);
      router.push("/home");
    } catch (error) {
      setToast({ type: "error", message: "Something went wrong. Try again.", open: true });
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
                    <Button className={s.btnForm} type="button" onClick={() => fileInputRef.current?.click()}>
                      Select from Computer
                    </Button>
                    <Button
                      className={s.btnForm}
                      type="button"
                      variant={"outlined"}
                      onClick={handleNextClick}
                    >
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
                    <Button className={s.btnForm} type="button" onClick={() => fileInputRef.current?.click()}>
                      Select from Computer
                    </Button>
                    <Button
                      className={s.btnForm}
                      type="button"
                      variant={"outlined"}
                      onClick={() => setToast({ type: "warning", message: "Option is not available", open: true })}
                    >
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

            <div className={s.descriptionField}>
              <Typography variant={"regular_14"}>Add description:</Typography>
              <Textarea
                title={"Description"}
                className={s.textarea}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className={s.btnGroup}>
              <Button
                className={s.btnForm}
                type="button"
                onClick={handlePrevClick}
                disabled={isUploading || isCreating}
              >
                Prev step
              </Button>
              <Button
                className={s.btnForm}
                type="button"
                onClick={handleSubmit}
                disabled={isUploading || isCreating}
              >
                {(isUploading || isCreating) ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </div>
        )}
      </Card>

      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          open={toast.open}
          setOpen={(open) => setToast((prev) => (prev ? { ...prev, open } : null))}
        />
      )}

      {showCloseNotification && (
        <CloseNotificationPopUp
          close={() => setShowCloseNotification(false)}
        />
      )}
    </div>
  );
}
