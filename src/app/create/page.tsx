"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import s from "./createPage.module.css";
import { Card, Toast } from "common/components";
import { useRouter } from "next/navigation";
import { UploadStep } from "./uploadStep/uploadStep";
import { DescriptionStep } from "./descriptionStep/descriptionStep";
import { CloseNotificationPopUp } from "./closeNotificationPopUp/closeNotificationPopUp";
import { Image, useCreatePostMutation, useUploadImagePostMutation } from "store/services/api/posts";
import { useImageManager } from "./hooks/useImageManager";
import { useToastManager } from "./hooks/useToastManager";

export default function CreatePage() {
  const {
    images,
    previewUrls,
    mainImageIndex,
    setMainImageIndex,
    addImages,
    removeImage,
    reset: resetImages,
  } = useImageManager();

  const { toast, showToast, closeToast } = useToastManager();
  const [description, setDescription] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showCloseNotification, setShowCloseNotification] = useState(false);

  const [uploadImagePost, { isLoading: isUploading }] = useUploadImagePostMutation();
  const [createPost, { isLoading: isCreating }] = useCreatePostMutation();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const toastRef = useRef<HTMLDivElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      addImages(Array.from(e.target.files), (msg) => showToast("error", msg));
    }
    e.target.value = "";
  };

  const handleClose = useCallback(() => setShowCloseNotification(true), []);

  const handleResetCreateForm = () => {
    resetImages();
    setDescription("");
    setShowForm(false);
    setShowCloseNotification(false);
    router.push("/");
  };

  const handleToastClose = (value: boolean) => {
    if (!value) {
      closeToast();
    }
  };

  const isValidUploadId = (id: string) =>
    typeof id === "string" && id.trim() !== "" && id !== "string" && id.length >= 24;

  const handleSubmit = async () => {
    if (images.length === 0) {
      showToast("warning", "Add at least one photo");
      return;
    }

    try {
      const uploadResult = await uploadImagePost({ files: images }).unwrap();

      if (!uploadResult.images || uploadResult.images.length === 0) {
        showToast("error", "Image upload failed. Try again.");
        return;
      }

      const validImages = uploadResult.images.filter((img) => isValidUploadId(img.uploadId));

      if (validImages.length === 0) {
        showToast("error", "No valid images found after upload.");
        return;
      }

      const childrenMetadata = validImages.map((img: Image, idx: number) => ({
        uploadId: img.uploadId,
        isMain: idx === mainImageIndex,
      }));

      await createPost({
        description: description.trim(),
        childrenMetadata,
      }).unwrap();

      showToast("success", "Post created successfully!");
      setTimeout(() => {
        handleResetCreateForm();
      }, 500);
    } catch {
      showToast("error", "Something went wrong. Try again.");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      const clickedOutsideModal = modalRef.current && !modalRef.current.contains(target);
      const clickedOutsideToast = toastRef.current && !toastRef.current.contains(target);
      const isToastVisible = !!toastRef.current;

      if (clickedOutsideModal && (!isToastVisible || clickedOutsideToast)) {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClose]);

  return (
    <div className={s.popUp}>
      <Card ref={modalRef}>
        {!showForm ? (
          <UploadStep
            previewUrls={previewUrls}
            mainImageIndex={mainImageIndex}
            setMainImageIndex={setMainImageIndex}
            handleRemoveImage={removeImage}
            onCloseHandler={handleClose}
            fileInputRef={fileInputRef}
            handleImageChange={handleImageChange}
            setShowForm={setShowForm}
          />
        ) : (
          <DescriptionStep
            description={description}
            setDescription={setDescription}
            onBack={() => setShowForm(false)}
            onSubmit={handleSubmit}
            isLoading={isUploading || isCreating}
            previewUrls={previewUrls}
          />
        )}
      </Card>

      {toast && (
        <div ref={toastRef}>
          <Toast type={toast.type} message={toast.message} open={toast.open} setOpen={handleToastClose} />
        </div>
      )}

      {showCloseNotification && (
        <CloseNotificationPopUp
          resetCreateForm={handleResetCreateForm}
          closeNotificationPopUp={() => setShowCloseNotification(false)}
        />
      )}
    </div>
  );
}
