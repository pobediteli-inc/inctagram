"use client";

import { KeyboardEvent, useEffect, useMemo, useRef, useState } from "react";
import { Bell } from "assets/icons";
import s from "./notificationDropdown.module.css";
import { NotificationType } from "common/types";
import { useMarkAsReadMutation } from "store/services/api/notifications";
import { NotificationItem, Typography } from "common/components";
import { filterNotificationsLastMonth } from "common/utils/filteredNotifications";

type Props = {
  initialNotifications: NotificationType[];
};

export const NotificationDropdown = ({ initialNotifications = [] }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [markAsRead] = useMarkAsReadMutation();

  const filteredNotifications = useMemo(() => {
    return filterNotificationsLastMonth(initialNotifications);
  }, [initialNotifications]);

  const unreadNotifications = useMemo(() => filteredNotifications.filter((n) => !n.isRead), [filteredNotifications]);

  const unreadCount = unreadNotifications.length;

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

  const toggleDropdown = async () => {
    if (!isOpen && unreadCount > 0) {
      try {
        const unreadIds = unreadNotifications.map((n) => n.id);
        await markAsRead({
          ids: unreadIds,
          notifyAt: new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString(), // например, фильтр по последнему месяцу
          sortDirection: "desc",
        });
      } catch (error) {
        console.error("Failed to mark notifications as read:", error);
        return;
      }
    }

    setIsOpen((prev) => !prev);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleDropdown();
    }
  };

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
            Уведомления
          </Typography>
          <div className={s.list}>
            {filteredNotifications.length === 0 ? (
              <div className={s.empty}>Нет уведомлений за последний месяц</div>
            ) : (
              filteredNotifications.map((notification) => (
                <NotificationItem key={notification.id} notification={notification} />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
