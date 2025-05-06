"use client";

import React, { useEffect, useRef, useState } from "react";
import s from "./uploadAvatar.module.css";
import { Card } from "common/components";
import { Toast } from "common/components";
import { CloseNotificationPopUp } from "./closeNotificationPopUp/closeNotificationPopUp";
import { useRouter } from "next/navigation";
import { UploadStep } from "./uploadStep/uploadStep";
import { useUploadAvatarMutation } from "store/services/api/profile";

export default function UploadAvatar() {
  const [image, setImage] = useState<File>();
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [showCloseNotification, setShowCloseNotification] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [toast, setToast] = useState<{
    type: "success" | "error" | "warning";
    message: string;
    open: boolean;
  } | null>(null);

  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onCloseHandler();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [uploadAvatar] = useUploadAvatarMutation();

  const onCloseHandler = () => setShowCloseNotification(true);

  const handleCloseNotification = (action: "discard" | "save") => {
    if (action === "discard") {
      setImage(undefined);
      setPreviewUrl("");
    }
    setShowCloseNotification(false);
    router.push("/settings");
  }; 

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = Array.from(e.target.files)[0];

      const validFormats = ["image/jpeg", "image/png"];

      if (!validFormats.includes(file.type)) {
        setErrorMessage(" The format of the uploaded photo must be PNG or JPEG");
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        setErrorMessage(" Photo size must be less than 10 MB");
        return;
      }

      setErrorMessage("");
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }

    e.target.value = "";
  };

  const handleSubmit = async () => {
    if (!image) {
      setToast({ type: "warning", message: "Add photo", open: true });
      return;
    }

    try {
      const uploadResult = await uploadAvatar(image).unwrap();
      if (!uploadResult || !Array.isArray(uploadResult.avatars)) {
        setToast({ type: "error", message: "Image upload failed. Try again.", open: true });
        return;
      }

      setToast({ type: "success", message: "Avatar added successfully!", open: true });
      setImage(undefined);
      setPreviewUrl("");
      router.push("/settings");
    } catch {
      setToast({ type: "error", message: "Something went wrong. Try again.", open: true });
    }
  };

  return (
    <div className={s.popUp}>
      <Card className={s.wrapper} ref={modalRef}>
        <UploadStep
          previewUrl={previewUrl}
          onCloseHandler={onCloseHandler}
          fileInputRef={fileInputRef}
          handleImageChange={handleImageChange}
          onSubmit={handleSubmit}
          errorMessage={errorMessage}
        />
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
