"use client";

import s from "./page.module.css";
import { TextField, Typography } from "common/components";
import React, { useState } from "react";

export default function Messenger() {
  const [selectedFriend, setSelectedFriend] = useState(null);

  const formatTime = (date) => {
    const now = new Date();
    const diffTime = now - date;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
    } else if (diffDays < 7) {
      return date.toLocaleDateString("en-US", { weekday: "short" });
    } else {
      return date.toLocaleDateString("en-US", { day: "numeric", month: "short" });
    }
  };

  const formatMessageTime = (date) => {
    return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  };

  const friends = [
    {
      id: 1,
      name: "Alex",
      lastName: "Johnson",
      messages: [
        { text: "Hey, how are you?", fromMe: false, date: new Date(Date.now() - 1000 * 60 * 30) },
        { text: "I'm good, thanks!", fromMe: true, date: new Date(Date.now() - 1000 * 60 * 25) },
        { text: "Want to meet tomorrow?", fromMe: false, date: new Date(Date.now() - 1000 * 60 * 20) },
        {
          text: "Sure, let's do it! Very long text very very long very very long very very long",
          fromMe: true,
          date: new Date(Date.now() - 1000 * 60 * 15),
        },
      ],
    },
    {
      id: 2,
      name: "Maria",
      lastName: "Smith",
      messages: [
        { text: "Can you help me with the project?", fromMe: false, date: new Date(Date.now() - 1000 * 60 * 60 * 3) },
        { text: "Of course, what do you need?", fromMe: true, date: new Date(Date.now() - 1000 * 60 * 60 * 2) },
        { text: "I need help with React components", fromMe: false, date: new Date(Date.now() - 1000 * 60 * 60 * 1) },
        { text: "I'll send you some examples", fromMe: true, date: new Date(Date.now() - 1000 * 60 * 30) },
      ],
    },
    {
      id: 3,
      name: "John",
      lastName: "Wilson",
      messages: [
        { text: "How was your weekend?", fromMe: false, date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2) },
        { text: "It was great! Went hiking", fromMe: true, date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1) },
        { text: "Sounds amazing!", fromMe: false, date: new Date(Date.now() - 1000 * 60 * 60 * 20) },
        { text: "You should join next time", fromMe: true, date: new Date(Date.now() - 1000 * 60 * 60 * 18) },
      ],
    },
  ];

  const getLastMessagePreview = (messages) => {
    const lastMessage = messages[messages.length - 1];
    return lastMessage.fromMe ? `You: ${lastMessage.text}` : lastMessage.text;
  };

  const handleFriendClick = (friend) => {
    setSelectedFriend(friend);
  };

  return (
    <div className={s.wrapper}>
      <Typography variant={"h1"}>Messenger</Typography>
      <div className={s.friendsListAndChat}>
        <div className={s.friendsList}>
          <div className={s.inputSearchWrapper}>
            <TextField type="search" className={s.inputSearch} placeholder="Input search" />
          </div>
          <div className={s.friendsContainer}>
            {friends.map((friend) => (
              <div key={friend.id} className={s.friendItem} onClick={() => handleFriendClick(friend)}>
                <div className={s.avatar}></div>
                <div className={s.friendInfo}>
                  <Typography variant={"regular_16"}>
                    {friend.name} {friend.lastName}
                  </Typography>
                  <Typography variant={"small"} color={"light"} className={s.lastMessage}>
                    {getLastMessagePreview(friend.messages)}
                  </Typography>
                </div>
                <Typography variant={"small"} color={"light"}>
                  {formatTime(friend.messages[friend.messages.length - 1].date)}
                </Typography>
              </div>
            ))}
          </div>
        </div>

        <div className={s.chat}>
          <div className={s.friendName}>
            {selectedFriend ? (
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div className={s.avatar}></div>
                <Typography variant={"h3"}>
                  {selectedFriend.name} {selectedFriend.lastName}
                </Typography>
              </div>
            ) : (
              <Typography variant={"h3"}>Select a friend</Typography>
            )}
          </div>

          <div className={s.chatField}>
            {selectedFriend ? (
              selectedFriend.messages.map((message, index) => (
                <div key={index} className={message.fromMe ? s.myMessage : s.friendMessage}>
                  <div className={s.messageContent}>
                    <Typography variant={"regular_14"}>{message.text}</Typography>
                    <Typography variant={"small"} color={"light"} component="time">
                      {formatMessageTime(message.date)}
                    </Typography>
                  </div>
                </div>
              ))
            ) : (
              <div className={s.noMessages}>
                <Typography variant={"regular_14"} color={"light"}>
                  Select a friend to start conversation
                </Typography>
              </div>
            )}
          </div>

          <div className={s.typeMessage}>
            <TextField
              type="text"
              placeholder="Type a message..."
              className={s.messageInput}
              disabled={!selectedFriend}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
