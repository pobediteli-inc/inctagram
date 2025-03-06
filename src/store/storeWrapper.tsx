"use client";

import { ReactElement, ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "./store";

type ReactChild = ReactElement | undefined | null | ReactNode;

export const StoreWrapper = ({ children }: { children: ReactChild }) => {
  return <Provider store={store}>{children}</Provider>;
};
