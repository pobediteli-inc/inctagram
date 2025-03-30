"use client";

import React, { useState } from "react";
import s from "./createPostForm.module.css";
import { Button, Card, Typography } from "../../index";
import { Close, ImageOutline } from "../../../../assets/icons";

type CreatePostFormProps = {
  onClose: () => void;
};

const CreatePostForm: React.FC<CreatePostFormProps> = ({ onClose }) => {
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file)); // Создаем URL изображения
    }
  };


  const handleButtonClick = () => {
    document.getElementById("photo-upload")?.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!description || !image) {
      alert("Please provide both description and image.");
      return;
    }

    const formData = new FormData();
    formData.append("description", description);
    formData.append("image", image);

    try {
      const res = await fetch("/api/createPost", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        alert("Post created successfully!");
        onClose();
      } else {
        alert("Error creating post.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred.");
    }
  };

  return (
    <div className={s.popUp}>
      <Card className={s.card}>
        <div className={s.popUpHeader}>
          <Typography variant={"h1"} color={"light"}>
            Add Photo
          </Typography>
          <button className={s.closeBtn} onClick={onClose}>
            <Close width={24} height={24} />
          </button>
        </div>

        <div className={s.modalWrapper}>

          <div className={s.imageWrapper}>
            {previewUrl ? (
              <img src={previewUrl} alt="Preview" className={s.previewImage} />
            ) : (
              <ImageOutline width={48} height={48} />
            )}
          </div>

          <form onSubmit={handleSubmit}>
            {/*<textarea*/}
            {/*  className={s.textarea}*/}
            {/*  value={description}*/}
            {/*  onChange={handleDescriptionChange}*/}
            {/*  placeholder="Post description"*/}
            {/*  required*/}
            {/*/>*/}

            <div className={s.fileInputWrapper}>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                id="photo-upload"
                className={s.fileUpload}
                style={{ display: "none" }}
                required
              />

              <div className={s.btnGroup}>
                <Button type="button" onClick={handleButtonClick}>
                  Select from Computer
                </Button>

                <Button type="button" onClick={() => {}} variant={"outlined"}>
                  Open Draft
                </Button>
              </div>

            </div>

            <button type="submit" className={s.submitBtn}>
              Create Post
            </button>

          </form>
        </div>
      </Card>
    </div>
  );
};

export default CreatePostForm;
