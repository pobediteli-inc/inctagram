// Функция: сколько времени назад
import { correctWordUsage } from "common/utils/correctWordUsage";

export const timeAgo = (date: string) => {
  const diff = Math.floor((Date.now() - new Date(date).getTime()) / 1000);

  if (diff < 60) return "только что";
  if (diff < 3600) {
    const mins = Math.floor(diff / 60);
    return `${mins} ${correctWordUsage(mins, ["минута", "минуты", "минут"])} назад`;
  }
  if (diff < 86400) {
    const hours = Math.floor(diff / 3600);
    return `${hours} ${correctWordUsage(hours, ["час", "часа", "часов"])} назад`;
  }
  const days = Math.floor(diff / 86400);
  return `${days} ${correctWordUsage(days, ["день", "дня", "дней"])} назад`;
};
