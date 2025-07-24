import * as React from "react";
import { forwardRef, ReactNode } from "react";
import styles from "./scroll.module.scss";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import clsx from "clsx";

type ScrollProps = {
  children: ReactNode;
  onScroll?: React.UIEventHandler<HTMLDivElement>;
  viewportClassName?: string;
  className?: string;
};

export const Scroll = forwardRef<HTMLDivElement, ScrollProps>(
  ({ children, onScroll, viewportClassName, className }, ref) => {
    return (
      <ScrollArea.Root className={clsx(styles.scrollRoot, className)}>
        <ScrollArea.Viewport className={clsx(styles.scrollViewport, viewportClassName)} onScroll={onScroll} ref={ref}>
          {children}
        </ScrollArea.Viewport>

        <ScrollArea.Scrollbar className={styles.scrollbar} orientation="vertical">
          <ScrollArea.Thumb className={styles.thumb} />
        </ScrollArea.Scrollbar>

        <ScrollArea.Scrollbar className={styles.scrollbar} orientation="horizontal">
          <ScrollArea.Thumb className={styles.thumb} />
        </ScrollArea.Scrollbar>

        <ScrollArea.Corner className={styles.corner} />
      </ScrollArea.Root>
    );
  }
);
Scroll.displayName = "Scroll";
