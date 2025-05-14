import React, { ChangeEvent } from "react";
import { Avatar, Textarea, Typography } from "common/components";
import s from "./formContainer.module.css";
import { useGetProfileQuery } from "store/services/api/profile";

type FormContainerProps = {
  description: string;
  setDescription: (value: string) => void;
};

export const FormContainer = ({ description, setDescription }: FormContainerProps) => {
  const { data } = useGetProfileQuery();
  const userName = data?.userName ?? "Unknown";
  const avatarUrl = data?.avatars?.[0]?.url || "";

  const handleTextarea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  return (
    <div className={s.formContainer}>
      <div className={s.profilePhotoAndUrl}>
        <Avatar size="small" className={s.profileImage} src={avatarUrl || undefined} />
        <Typography variant="regular_16">{userName}</Typography>
      </div>

      <div className={s.descriptionField}>
        <Typography variant="regular_14" className={s.descriptionTitle}>
          Add publication descriptions
        </Typography>
        <Textarea title="" className={s.textarea} value={description} onChange={handleTextarea} maxLength={500} />
      </div>
    </div>
  );
};
