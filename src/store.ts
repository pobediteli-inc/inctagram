import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { inctagramApi } from "./services/inctagram";

export const store = configureStore({
  reducer: {
    [inctagramApi.reducerPath]: inctagramApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(inctagramApi.middleware),
});

setupListeners(store.dispatch);
