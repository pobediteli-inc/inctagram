"use client";

import { KeyboardEvent, useEffect, useMemo, useRef, useState } from "react";
import { Bell } from "assets/icons";
import s from "./notificationDropdown.module.css";
import { NotificationType, useMarkAsReadMutation } from "store/services/api/notifications";
import { NotificationItem, Typography } from "common/components";

type Props = {
  notifications: NotificationType[];
};

export const NotificationDropdown = ({ notifications }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [markAsRead] = useMarkAsReadMutation();

  const unreadCount = useMemo(() => notifications.filter((n) => !n.isRead).length, [notifications]);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleMarkAsRead = (id: number) => {
    markAsRead({ ids: [id] });
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      toggleDropdown();
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={s.wrapper} ref={dropdownRef}>
      <div
        className={s.icon}
        onClick={toggleDropdown}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label="Toggle notifications dropdown"
      >
        <Bell />
        {unreadCount > 0 && <span className={s.badge}>{unreadCount}</span>}
      </div>

      {isOpen && (
        <div className={s.dropdown} role="menu" aria-label="Notifications">
          <Typography variant="medium_16" className={s.notificationHeader}>
            Notifications
          </Typography>
          <div className={s.list}>
            {notifications.length === 0 ? (
              <div className={s.empty}>No notifications</div>
            ) : (
              notifications.map((notification) => (
                <NotificationItem key={notification.id} notification={notification} onMarkAsRead={handleMarkAsRead} />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
