import { MessageSocket } from "store/services/api/messenger";

export const sortMessages = (messages: MessageSocket[]) =>
  messages.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
