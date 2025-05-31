"use client";

import { FC, useEffect, useRef, useState } from "react";
import { Bell } from "assets/icons";
import s from "./notificationDropdown.module.css";
import { useAppSelector } from "common/hooks/useAppSelector";
import { selectIsLoggedIn } from "store/services/slices/authSlice";
import { io, Socket } from "socket.io-client";

type Notification = {
  id: number;
  message: string;
  isRead: boolean;
  notifyAt: string;
};

type Props = {
  unreadCount: number;
  setUnreadCount: (count: number) => void;
};

export const NotificationDropdown: FC<Props> = ({ unreadCount, setUnreadCount }) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!isLoggedIn) return;

    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) return;

    const socket = io("https://inctagram.work", {
      query: { accessToken },
    });

    socketRef.current = socket;

    socket.on("notifications", (newNotification: Notification) => {
      setNotifications((prev) => [newNotification, ...prev]);
      setUnreadCount((prev) => prev + 1);
    });

    socket.on("connect_error", (err) => {
      console.error("Ошибка WebSocket:", err);
    });

    return () => {
      socket.disconnect();
    };
  }, [isLoggedIn, setUnreadCount]);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
    if (!isOpen) {
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      setUnreadCount(0);
    }
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  if (!isLoggedIn) return null;

  return (
    <div className={s.wrapper} ref={dropdownRef}>
      <div className={s.icon} onClick={toggleDropdown}>
        <Bell />
        {unreadCount > 0 && <span className={s.badge}>{unreadCount}</span>}
      </div>

      {isOpen && (
        <div className={s.dropdown}>
          <h4>Уведомления</h4>
          <div className={s.list}>
            {notifications.length === 0 ? (
              <div className={s.empty}>Нет уведомлений</div>
            ) : (
              notifications.map((n) => (
                <div key={n.id} className={s.notification}>
                  <div>{n.message}</div>
                  <span className={s.date}>{new Date(n.notifyAt).toLocaleString()}</span>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
