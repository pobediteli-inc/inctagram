import React from "react";
import s from "./saveStep.module.css";
import { Close } from "assets/icons";
import { Button, Textarea, Typography } from "common/components";

type DescriptionStepProps = {
  description: string;
  setDescription: (value: string) => void;
  onCloseHandler: () => void;
  onBack: () => void;
  onSubmit: () => void;
  isLoading: boolean;
};

export const SaveStep = ({
  description,
  setDescription,
  onCloseHandler,
  onBack,
  onSubmit,
  isLoading,
}: DescriptionStepProps) => {
  return (
    <div className={s.formContainer}>
      <div className={s.popUpHeader}>
        <Typography variant="h2" color="light">
          Add a Profile Photo
        </Typography>
        <Button className={s.closeBtn} onClick={onCloseHandler}>
          <Close width={24} height={24} />
        </Button>
      </div>

      <div className={s.descriptionField}>
        <Typography variant="regular_14">Add description:</Typography>
        <Textarea
          title="Description"
          className={s.textarea}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className={s.btnGroup}>
        <Button className={s.btnForm} type="button" onClick={onBack} disabled={isLoading}>
          Prev step
        </Button>
        <Button className={s.btnForm} type="button" onClick={onSubmit} disabled={isLoading}>
          {isLoading ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </div>
  );
};
