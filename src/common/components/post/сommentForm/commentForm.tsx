"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button, Textarea } from "common/components";
import s from "./commentForm.module.css";
import clsx from "clsx";

type Props = {
  postId: number;
  onCommentSubmitAction: (postId: number, commentText: string) => Promise<void>;
  className?: string;
};

type FormValues = {
  comment: string;
};

export const CommentForm = ({ postId, onCommentSubmitAction, className }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
    watch,
    setValue,
  } = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      comment: "",
    },
  });

  const [isFocused, setIsFocused] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const commentValue = watch("comment");
  const characterCount = commentValue?.length || 0;
  const isSubmitDisabled = !commentValue?.trim() || characterCount > 300;

  const onSubmit = async (data: FormValues) => {
    if (characterCount > 300) return;

    setSubmitError(null);

    try {
      await onCommentSubmitAction(postId, data.comment.trim());
      setValue("comment", "");
      reset({ comment: "" });
    } catch {
      setSubmitError("Failed to submit comment. Please try again.");
    }
  };

  const handleOnFocus = () => {
    setIsFocused(true);
    setSubmitError(null);
  };

  const handleOnBlur = () => setIsFocused(false);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={clsx(s.form, className)}>
      <div className={s.inputContainer}>
        <Textarea
          {...register("comment", {
            maxLength: 300,
          })}
          title=""
          placeholder="Add a Comment..."
          className={s.commentTextarea}
          error={submitError || undefined}
          disabled={isSubmitting}
          maxLength={300}
          tabIndex={-1}
          hideCounter={!isFocused}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          value={commentValue}
          variant={"outlined"}
        />
        {submitError && <p className={s.errorMessage}>{submitError}</p>}
      </div>
      <Button type="submit" variant="link" disabled={isSubmitDisabled || isSubmitting} className={s.commentButton}>
        {isSubmitting ? "Publishing..." : "Publish"}
      </Button>
    </form>
  );
};
