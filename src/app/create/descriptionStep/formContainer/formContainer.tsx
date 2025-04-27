import React, { ChangeEvent } from "react";
import { Avatar, Textarea, Typography } from "../../../../common/components";
import s from "./formContainer.module.css";
import Image from "next/image";
import { useGetProfileQuery } from "../../../../store/services/api/profile/profileApi";

type FormContainerProps = {
  description: string;
  setDescription: (value: string) => void;
};

export const FormContainer = ({ description, setDescription }: FormContainerProps) => {
  const { data, isLoading, isError } = useGetProfileQuery();

  const renderProfileContent = () => {
    if (isLoading) {
      return <Typography variant="regular_16">Loading profile...</Typography>;
    }

    if (isError || !data) {
      return <Typography variant="regular_16">Error loading profile</Typography>;
    }

    const { userName, avatars } = data;
    const avatarUrl = avatars?.length ? avatars[0].url : null;

    return (
      <>
        <div>
          {avatarUrl ? (
            <Image src={avatarUrl} alt="Profile Avatar" className={s.profileImage} width={36} height={36} />
          ) : (
            <Avatar width={36} height={36} className={s.profileImage} />
          )}
        </div>
        <Typography variant="regular_16">{userName}</Typography>
      </>
    );
  };

  const handleTextarea = (e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value);
  return (
    <div className={s.formContainer}>
      <div className={s.profilePhotoAndUrl}>{renderProfileContent()}</div>

      <div className={s.descriptionField}>
        <Typography variant="regular_14" className={s.descriptionTitle}>
          Add publication descriptions
        </Typography>
        <Textarea title="" className={s.textarea} value={description} onChange={handleTextarea} />
      </div>
    </div>
  );
};
