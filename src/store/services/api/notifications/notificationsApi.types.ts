export type NotificationType = {
  id: number;
  clientId?: string;
  message: string;
  isRead: boolean;
  notifyAt: string;
  createdAt?: string;
};

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
