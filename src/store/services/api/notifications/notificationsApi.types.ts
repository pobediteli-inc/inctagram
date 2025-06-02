import { NotificationType } from "common/types";

export type MarkAsReadRequest = {
  ids: number[];
  notifyAt?: string;
  sortBy?: string;
  isRead?: boolean;
  pageSize?: number;
  sortDirection?: "asc" | "desc";
  cursor?: number;
};

export type GetNotificationsByProfileRequest = {
  cursor?: number;
  sortBy?: string;
  notifyAt?: string;
  isRead?: boolean;
  pageSize?: number;
  sortDirection?: "asc" | "desc";
};

export type GetNotificationsByProfileResponse = {
  pageSize: number;
  totalCount: number;
  notReadCount: number;
  items: NotificationType[];
};

export type ErrorMessage = {
  message: string;
  field: string;
};

export type ErrorResponse = {
  statusCode: number;
  messages: ErrorMessage[];
  error: string;
};
