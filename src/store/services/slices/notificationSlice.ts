import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NotificationType } from "common/types";
import { RootState } from "store/store";

type NotificationState = {
  items: NotificationType[];
  unreadCount: number;
};

const initialState: NotificationState = {
  items: [],
  unreadCount: 0,
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<NotificationType>) => {
      state.items.unshift(action.payload);
      if (!action.payload.isRead) {
        state.unreadCount++;
      }
    },
    markAllAsRead: (state) => {
      state.items = state.items.map((n) => ({ ...n, isRead: true }));
      state.unreadCount = 0;
    },
    setNotifications: (state, action: PayloadAction<NotificationType[]>) => {
      state.items = action.payload;
      state.unreadCount = action.payload.filter((n) => !n.isRead).length;
    },
    clearNotifications: (state) => {
      state.items = [];
      state.unreadCount = 0;
    },
  },
  selectors: {
    selectNotifications: (state) => state.items,
    selectUnreadCount: (state) => state.unreadCount,
    selectTotalCount: (state) => state.items.length,
  },
});

export const { addNotification, markAllAsRead, setNotifications, clearNotifications } = notificationSlice.actions;

export const { selectNotifications, selectUnreadCount, selectTotalCount } = notificationSlice.getSelectors(
  (state: RootState) => state.notification
);

export const notificationReducer = notificationSlice.reducer;
