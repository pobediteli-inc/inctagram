import React from "react";
import s from "./descriptionStep.module.css";
import { DescriptionHeader } from "./descriptionHeader/descriptionHeader";
import { FormContainer } from "./formContainer/formContainer";
import { UploadedPhotos } from "./uploadedPhotos/uploadedPhotos";

type DescriptionStepProps = {
  description: string;
  setDescription: (value: string) => void;
  onBack: () => void;
  onSubmit: () => void;
  isLoading: boolean;
  previewUrls: string[];
};

export const DescriptionStep = ({
  description,
  setDescription,
  onBack,
  onSubmit,
  isLoading,
  previewUrls,
}: DescriptionStepProps) => {
  return (
    <div className={s.modalWrapper}>
      <DescriptionHeader isLoading={isLoading} onBack={onBack} onSubmit={onSubmit} />

      <div className={s.photosAndDescription}>
        <UploadedPhotos previewUrls={previewUrls} />
        <FormContainer setDescription={setDescription} description={description} />
      </div>
    </div>
  );
};
