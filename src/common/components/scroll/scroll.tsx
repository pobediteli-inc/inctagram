import * as React from "react";
import styles from "./scroll.module.scss";
import { ReactNode } from "react";
import * as ScrollArea from "@radix-ui/react-scroll-area";

type ScrollProps = {
  children: ReactNode;
};

export const Scroll: React.FC<ScrollProps> = ({ children }) => {
  return (
    <ScrollArea.Root className={styles.scrollRoot}>
      <ScrollArea.Viewport className={styles.scrollViewport}>{children}</ScrollArea.Viewport>

      <ScrollArea.Scrollbar className={styles.scrollbar} orientation="vertical">
        <ScrollArea.Thumb className={styles.thumb} />
      </ScrollArea.Scrollbar>

      <ScrollArea.Scrollbar className={styles.scrollbar} orientation="horizontal">
        <ScrollArea.Thumb className={styles.thumb} />
      </ScrollArea.Scrollbar>

      <ScrollArea.Corner className={styles.Corner} />
    </ScrollArea.Root>
  );
};
