import React from "react";
import { Button, Typography } from "../../../../common/components";
import s from "./descriptionHeader.module.css";
import { ArrowIosBack } from "../../../../assets/icons";

type DescriptionHeaderProps = {
  onBack: () => void;
  onSubmit: () => void;
  isLoading: boolean;
};

export const DescriptionHeader = ({ onBack, onSubmit, isLoading }: DescriptionHeaderProps) => {
  return (
    <div className={s.popUpHeader}>
      <Button
        type="button"
        variant="link"
        onClick={onBack}
        disabled={isLoading}
        style={{ color: "var(--light-100)", display: "contents" }}
      >
        <ArrowIosBack width={24} height={24} />
      </Button>

      <Typography variant="h2" color="light">
        Publication
      </Typography>

      <Button type="button" variant="link" onClick={onSubmit} disabled={isLoading} style={{ display: "contents" }}>
        {isLoading ? "Publishing..." : "Publish"}
      </Button>
    </div>
  );
};
