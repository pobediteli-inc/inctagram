/**
 * Фильтрует уведомления, оставляя только те, что были созданы за последний месяц
 */
import { NotificationType } from "../../store/services/api/notifications";

export const filterNotificationsLastMonth = (notifications: NotificationType[]): NotificationType[] => {
  const now = new Date();
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(now.getMonth() - 1);

  return notifications.filter((n) => {
    const dateStr = n.createdAt || n.notifyAt;
    if (!dateStr) return false;
    const date = new Date(dateStr);
    return date >= oneMonthAgo;
  });
};
