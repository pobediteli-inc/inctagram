"use client";

import { FC, useState } from "react";
import s from "./description.module.css";
import { Typography } from "common/components";

export const Description: FC<Props> = ({ description = "", onClickShowMore }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const MAX_CHAR_COUNT = 70;
  const isOverflowing = description.length > MAX_CHAR_COUNT;

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
    onClickShowMore?.(!isExpanded);
  };

  return (
    <div className={s.descriptionContainer}>
      <Typography variant="regular_14" color="light" className={s.descriptionWrapper}>
        {isExpanded || !isOverflowing ? description : description.slice(0, MAX_CHAR_COUNT) + "... "}
        {isOverflowing && (
          <>
            {isExpanded ? (
              <Typography onClick={handleExpand} className={s.hide}>
                hide
              </Typography>
            ) : (
              <Typography onClick={handleExpand} className={s.showMore}>
                show more
              </Typography>
            )}
          </>
        )}
      </Typography>
    </div>
  );
};

type Props = {
  description?: string;
  onClickShowMore?: (showMore: boolean) => void;
};
