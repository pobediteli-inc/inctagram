import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authSlice, authSliceReducer } from "store/services/slices/authSlice";
import { statusSlice, statusSliceReducer } from "store/services/slices/statusSlice";
import { baseApi } from "store/services/api/baseApi/baseApi";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    [authSlice.name]: authSliceReducer,
    [statusSlice.name]: statusSliceReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
