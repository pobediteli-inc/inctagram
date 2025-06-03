// Function: how long ago
import { correctWordUsage } from "common/utils/correctWordUsage";

export const timeAgo = (date: string) => {
  const diff = Math.floor((Date.now() - new Date(date).getTime()) / 1000);

  if (diff < 60) return "just now";
  if (diff < 3600) {
    const mins = Math.floor(diff / 60);
    return `${mins} ${correctWordUsage(mins, ["minute", "minutes", "minutes"])} ago`;
  }
  if (diff < 86400) {
    const hours = Math.floor(diff / 3600);
    return `${hours} ${correctWordUsage(hours, ["hour", "hours", "hours"])} ago`;
  }
  const days = Math.floor(diff / 86400);
  return `${days} ${correctWordUsage(days, ["day", "days", "days"])} ago`;
};
