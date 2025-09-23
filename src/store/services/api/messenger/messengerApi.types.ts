export type MessageSocket = {
  id: number;
  ownerId: number;
  receiverId: number;
  messageText: string;
  createdAt: string;
  updatedAt: string;
  messageType: "TEXT" | "IMAGE" | "FILE";
  status: "SENT" | "DELIVERED" | "READ";
  userName?: string;
  avatars?: Array<{
    url: string;
    width: number;
    height: number;
    fileSize: number;
    createdAt: string;
  }>;
};

export type MessagesResponse = {
  pageSize: number;
  totalCount: number;
  notReadCount: number;
  items: MessageSocket[];
};

export type GetMessagesRequest = {
  cursor?: number;
  pageSize?: number;
  searchName?: string;
};

export type GetMessagesByUserRequest = GetMessagesRequest & {
  dialoguePartnerId: number;
};

export type UpdateMessageStatusRequest = {
  ids: number[];
};

export type FriendType = {
  id: number;
  name: string;
  avatarUrl?: string;
};
