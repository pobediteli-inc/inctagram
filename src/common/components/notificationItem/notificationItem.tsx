import { NotificationType } from "common/types";
import s from "./notificationItem.module.css";
import { timeAgo } from "common/utils/timeAgo";
import { Typography } from "common/components/typography/typography";

type Props = {
  notification: NotificationType;
};

export const NotificationItem = ({ notification }: Props) => {
  return (
    <div className={`${s.notification} ${!notification.isRead ? s.unread : ""}`} role="menuitem" tabIndex={-1}>
      <Typography variant={"bold_14"}>
        Новое уведомление!
        {!notification.isRead && (
          <Typography variant={"small"} className={s.newLabel}>
            Новое
          </Typography>
        )}
      </Typography>
      <Typography variant={"regular_14"}>{notification.message}</Typography>
      <Typography variant={"small"} className={s.timeAgo}>
        {notification.createdAt ? timeAgo(notification.createdAt) : ""}
      </Typography>
    </div>
  );
};
