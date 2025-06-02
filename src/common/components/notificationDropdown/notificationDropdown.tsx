"use client";

import { useEffect, useRef, useState, useMemo, KeyboardEvent } from "react";
import { Bell } from "assets/icons";
import s from "./notificationDropdown.module.css";
import { NotificationType } from "common/types";
import { useMarkAsReadMutation } from "store/services/api/notifications";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { markAllAsRead, selectNotifications, setNotifications } from "store/services/slices/notificationSlice";
import { NotificationItem, Typography } from "common/components";
import { filterNotificationsLastMonth } from "common/utils/filteredNotifications";

type Props = {
  initialNotifications: NotificationType[];
};

export const NotificationDropdown = ({ initialNotifications = [] }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const notifications = useAppSelector(selectNotifications);
  const [markAsRead] = useMarkAsReadMutation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (initialNotifications.length > 0 && notifications.length === 0) {
      dispatch(setNotifications(initialNotifications));
    }
  }, [initialNotifications, dispatch, notifications.length]);

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

  const unreadCount = useMemo(() => {
    return notifications.filter((n) => !n.isRead).length;
  }, [notifications]);

  const filteredNotifications = useMemo(() => {
    return filterNotificationsLastMonth(notifications);
  }, [notifications]);

  const toggleDropdown = async () => {
    if (!isOpen && unreadCount > 0) {
      try {
        const unreadIds = notifications.filter((n) => !n.isRead).map((n) => n.id);
        if (unreadIds.length > 0) {
          await markAsRead({ ids: unreadIds });
          dispatch(markAllAsRead());
        }
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
