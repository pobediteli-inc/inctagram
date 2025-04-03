import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "./services/auth";
import { authSliceReducer, authSlice } from "features/slices/auth/authSlice";
import { statusSlice, statusSliceReducer } from "features/slices/status/statusSlice";
import {profileApi} from "store/services/profileApi/profileApi";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [authSlice.name]: authSliceReducer,
    [statusSlice.name]: statusSliceReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware).concat(profileApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
