import React, { ChangeEvent } from "react";
import { Avatar, Textarea, Typography } from "../../../../common/components";
import s from "./formContainer.module.css";
import { useGetProfileQuery } from "../../../../store/services/api/profile/profileApi";

type FormContainerProps = {
  description: string;
  setDescription: (value: string) => void;
};

export const FormContainer = ({ description, setDescription }: FormContainerProps) => {
  const { data } = useGetProfileQuery();
  const userName = data?.userName ?? "Unknown";
  const avatarUrl = data?.avatars?.length ? data.avatars[0].url : null;

  const handleTextarea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  return (
    <div className={s.formContainer}>
      <div className={s.profilePhotoAndUrl}>
        <div>
          <Avatar width={36} height={36} className={s.profileImage} src={avatarUrl ?? undefined} size="small" />
        </div>
        <Typography variant="regular_16">{userName}</Typography>
      </div>

      <div className={s.descriptionField}>
        <Typography variant="regular_14" className={s.descriptionTitle}>
          Add publication descriptions
        </Typography>
        <Textarea title="" className={s.textarea} value={description} onChange={handleTextarea} />
      </div>
    </div>
  );
};
