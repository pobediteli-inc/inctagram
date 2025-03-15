import * as React from "react";
import { ComponentPropsWithoutRef, ComponentRef, forwardRef } from "react";
import * as RadixToast from "@radix-ui/react-toast";
import s from "./toast.module.css";
import { MessageStatus, NullableProps } from "common/types";
import { Typography } from "common/components/typography/typography";
import clsx from "clsx";
import { CloseOutline } from "assets/icons";

export const Toast = forwardRef<ComponentRef<typeof RadixToast.Root>, Props>(
  ({ type, message, toastPosition, ...rest }, ref) => {
    const [open, setOpen] = React.useState<boolean>(false);
    const getDuration = (status: MessageStatus) => {
      switch (status) {
        case "success":
        case "info":
          return 3000;
        case "error":
        case "warning":
          return 5000;
        default:
          return 6000;
      }
    };
    const handleClose = () => setOpen(false);

    return (
      <RadixToast.Provider swipeDirection="left">
        <RadixToast.Root
          className={clsx(s.root, s[`color-${type}`])}
          open={open}
          onOpenChange={setOpen}
          duration={getDuration(type)}
          ref={ref}
          {...rest}
        >
          <CloseOutline
            width={24}
            height={24}
            className={s.closeButton}
            color={"var(--light-100)"}
            onClick={handleClose}
          />
          <RadixToast.Title className={clsx(s.title, s[`title-${type}`])}>
            {type === "success" && "Success"}
            {type === "error" && "Error"}
            {type === "info" && "Information"}
            {type === "warning" && "Warning"}
          </RadixToast.Title>
          <RadixToast.Description className={clsx(s.description)} asChild>
            <Typography variant={"regular_14"} color={"dark"}>
              {message}
            </Typography>
          </RadixToast.Description>
        </RadixToast.Root>
        <RadixToast.Viewport className={clsx(s.Viewport, s[`position-${toastPosition} `])} />
      </RadixToast.Provider>
    );
  }
);

type Props = {
  type: MessageStatus;
  message: NullableProps<string>;
  open?: boolean;
  setOpen?: (open: boolean) => void;
  toastPosition?: "left" | "right";
} & ComponentPropsWithoutRef<typeof RadixToast.Provider>;
