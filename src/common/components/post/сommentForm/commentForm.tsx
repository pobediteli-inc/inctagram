"use client";

import { FormEvent, useState } from "react";
import { Button, Textarea } from "common/components";
import s from "./commentForm.module.css";

type Props = {
  postId: number;
  onCommentSubmitAction: (postId: number, commentText: string) => void;
};

export const CommentForm = ({ postId, onCommentSubmitAction }: Props) => {
  const [commentText, setCommentText] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (commentText.trim().length > 0) {
      onCommentSubmitAction(postId, commentText);
      setCommentText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={s.form}>
      <Textarea
        title=""
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Add a Comment..."
        maxLength={300}
        className={s.commentTextarea}
        error={undefined}
        disabled={false}
        hideCounter
        tabIndex={-1}
      />
      <Button type="submit" variant="link" disabled={commentText.trim().length === 0} className={s.commentButton}>
        Publish
      </Button>
    </form>
  );
};
