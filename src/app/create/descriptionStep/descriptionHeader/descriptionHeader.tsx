import React from "react";
import { Button, Typography } from "../../../../common/components";
import { ChevronLeft } from "lucide-react";
import s from "./descriptionHeader.module.css";

type DescriptionHeaderProps = {
  onBack: () => void;
  onSubmit: () => void;
  isLoading: boolean;
};

export const DescriptionHeader = ({ onBack, onSubmit, isLoading }: DescriptionHeaderProps) => {
  return (
    <div className={s.popUpHeader}>
      <Button className={s.prevStep} type="button" variant="primary" onClick={onBack} disabled={isLoading}>
        <ChevronLeft size={20} />
      </Button>

      <Typography variant="h2" color="light">
        Publication
      </Typography>

      <Button className={s.btnForm} type="button" variant="link" onClick={onSubmit} disabled={isLoading}>
        {isLoading ? "Publishing..." : "Publish"}
      </Button>
    </div>
  );
};
