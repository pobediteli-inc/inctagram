"use client";

import * as Dialog from "@radix-ui/react-dialog";
import clsx from "clsx";
import s from "./postModal.module.scss";
import { ComponentPropsWithoutRef } from "react";
import SvgClose from "assets/icons/Close";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

type Props = {
  open: boolean;
  onClose: () => void;
} & ComponentPropsWithoutRef<"div">;

export const PostModal = ({ onClose, open, children, className, ...rest }: Props) => (
  <Dialog.Root open={open} onOpenChange={onClose} {...rest}>
    <Dialog.Portal>
      <Dialog.Overlay className={s.overlay} />
      <Dialog.Content className={clsx(s.content, className)}>
        <VisuallyHidden>
          <Dialog.Title>Post</Dialog.Title>
        </VisuallyHidden>
        {children}
        <Dialog.Close asChild>
          <button className={s.iconButton} aria-label="Close">
            <SvgClose width={"24px"} height={"24px"} />
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);
