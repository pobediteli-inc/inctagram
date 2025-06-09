"use client";

import { MouseEvent } from "react";
import { NotificationType } from "common/types";
import s from "./notificationItem.module.css";
import { timeAgo } from "common/utils/timeAgo";
import { Typography } from "common/components/typography/typography";

type Props = {
  notification: NotificationType;
  onMarkAsRead?: (id: number) => void;
};

export const NotificationItem = ({ notification, onMarkAsRead }: Props) => {
  const handleInteraction = (e: MouseEvent) => {
    e.stopPropagation();
    if (!notification.isRead && onMarkAsRead) {
      onMarkAsRead(notification.id);
    }
  };

  const handleMouseEnter = (e: MouseEvent) => {
    if (!notification.isRead && onMarkAsRead) {
      onMarkAsRead(notification.id);
    }
  };

  return (
    <div
      className={`${s.notification} ${!notification.isRead ? s.unread : ""}`}
      role="menuitem"
      tabIndex={-1}
      onClick={handleInteraction}
      onMouseEnter={handleMouseEnter}
      style={{ cursor: "pointer" }}
    >
      <div className={s.newNotificationAndLabel}>
        <div className={s.newNotificationAndLabel}>
          <Typography variant="bold_14" asChild>
            <span>
              New notification!
              {!notification.isRead && (
                <Typography variant="small" className={s.newLabel} asChild>
                  <span>&nbsp;New</span>
                </Typography>
              )}
            </span>
          </Typography>
        </div>
      </div>
      <Typography variant={"regular_14"}>{notification.message}</Typography>
      <Typography variant={"small"} className={s.timeAgo}>
        {notification.createdAt ? timeAgo(notification.createdAt) : ""}
      </Typography>
    </div>
  );
};
