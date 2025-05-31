import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Notification = {
  id: number;
  message: string;
  isRead: boolean;
  notifyAt: string;
};

type NotificationState = {
  items: Notification[];
  unreadCount: number;
};

const initialState: NotificationState = {
  items: [],
  unreadCount: 0,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.items.unshift(action.payload);
      if (!action.payload.isRead) state.unreadCount++;
    },
    markAllAsRead: (state) => {
      state.items = state.items.map((n) => ({ ...n, isRead: true }));
      state.unreadCount = 0;
    },
  },
});

export const { addNotification, markAllAsRead } = notificationSlice.actions;
export default notificationSlice.reducer;
