"use client";

import React, { useRef, useState } from "react";
import s from "./createPage.module.css";
import { Card } from "common/components";
import { Toast } from "common/components";
import { CloseNotificationPopUp } from "./closeNotificationPopUp/closeNotificationPopUp";
import { useRouter } from "next/navigation";
import { UploadStep } from "./uploadStep/uploadStep";
import { DescriptionStep } from "./descriptionStep/descriptionStep";
import { useCreatePostMutation, useUploadImagePostMutation } from "store/services/api/posts";

export default function CreatePage() {
  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [mainImageIndex, setMainImageIndex] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [showForm, setShowForm] = useState<boolean>(false);
  const [showCloseNotification, setShowCloseNotification] = useState<boolean>(false);
  const [toast, setToast] = useState<{
    type: "success" | "error" | "warning";
    message: string;
    open: boolean;
  } | null>(null);

  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploadImagePost, { isLoading: isUploading }] = useUploadImagePostMutation();
  const [createPost, { isLoading: isCreating }] = useCreatePostMutation();

  const onCloseHandler = () => setShowCloseNotification(true);

  const handleCloseNotification = (action: "discard" | "save") => {
    if (action === "discard") {
      setImages([]);
      setPreviewUrls([]);
      setDescription("");
      setShowForm(false);
    }
    setShowCloseNotification(false);
    router.push("/");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const MAX_IMAGES = 10;
      if (images.length + filesArray.length > MAX_IMAGES) {
        setToast({ type: "warning", message: `You can upload up to ${MAX_IMAGES} images.`, open: true });
        e.target.value = "";
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
          setToast({
            type: "error",
            message: "The photo must be less than 20 Mb and have JPEG or PNG format",
            open: true,
          });
          return;
        }
        newFiles.push(file);
        newUrls.push(URL.createObjectURL(file));
      });

      setImages((prev) => [...prev, ...newFiles]);
      setPreviewUrls((prev) => [...prev, ...newUrls]);
    }

    e.target.value = "";
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
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

      await createPost({ description, childrenMetadata }).unwrap();

      setToast({ type: "success", message: "Post created successfully!", open: true });
      setImages([]);
      setPreviewUrls([]);
      setDescription("");
      setShowForm(false);
      router.push("/");
    } catch {
      setToast({ type: "error", message: "Something went wrong. Try again.", open: true });
    }
  };

  return (
    <div className={s.popUp}>
      <Card className={s.wrapper}>
        {!showForm ? (
          <UploadStep
            previewUrls={previewUrls}
            mainImageIndex={mainImageIndex}
            setMainImageIndex={setMainImageIndex}
            handleRemoveImage={handleRemoveImage}
            onCloseHandler={onCloseHandler}
            fileInputRef={fileInputRef}
            handleImageChange={handleImageChange}
            setShowForm={setShowForm}
          />
        ) : (
          <DescriptionStep
            description={description}
            setDescription={setDescription}
            onCloseHandler={onCloseHandler}
            onBack={() => setShowForm(false)}
            onSubmit={handleSubmit}
            isLoading={isUploading || isCreating}
          />
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

      {showCloseNotification && <CloseNotificationPopUp close={() => handleCloseNotification("discard")} />}
    </div>
  );
}
