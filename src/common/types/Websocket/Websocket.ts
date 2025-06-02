export type NotificationType = {
  id: number;
  clientId?: string;
  message: string;
  isRead: boolean;
  notifyAt: string;
  createdAt?: string;
};

export enum WS_EVENT_PATH {
  NOTIFICATIONS = "notifications",
  RECEIVE_MESSAGE = "receive-message",
  UPDATE_MESSAGE = "update-message",
  MESSAGE_DELETED = "message-deleted",
  MESSAGE_SEND = "message-send",
  ERROR = "error",
}
