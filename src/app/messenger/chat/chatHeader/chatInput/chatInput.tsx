"use client";

import { ChangeEvent, KeyboardEvent } from "react";
import s from "./chatInput.module.css";
import { Button, Textarea, Typography } from "common/components";

type Props = {
  messageText: string;
  setMessageTextAction: (value: string) => void;
  sendMessageAction: () => void;
  maxLength: number;
};

export const ChatInput = ({ messageText, setMessageTextAction, sendMessageAction, maxLength }: Props) => {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    let value = e.target.value;
    if (value.length > maxLength) value = value.slice(0, maxLength);
    setMessageTextAction(value);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessageAction();
    }
  };

  return (
    <div className={s.typeMessage}>
      <div className={s.inputRow}>
        <Textarea
          title={""}
          value={messageText}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
          className={s.textareaMessage}
        />
        {messageText.trim() && (
          <Button onClick={sendMessageAction} variant="link" className={s.sendButton}>
            Send message
          </Button>
        )}
      </div>
      <Typography variant={"small"} className={`${s.messageCounter} ${messageText.length >= maxLength ? s.error : ""}`}>
        {messageText.length}/{maxLength}
      </Typography>
    </div>
  );
};
