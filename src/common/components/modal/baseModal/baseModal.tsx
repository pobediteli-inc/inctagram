import * as Dialog from "@radix-ui/react-dialog";
import clsx from "clsx";
import s from "./baseModal.module.css";
import { ComponentPropsWithoutRef } from "react";
import SvgClose from "assets/icons/Close";
import { Typography } from "../../typography/typography";

type Props = {
  open: boolean;
  onClose: () => void;
  modalTitle: string;
} & ComponentPropsWithoutRef<"div">;

export const BaseModal = ({ modalTitle, onClose, open, children, className, ...rest }: Props) => (
  <Dialog.Root open={open} onOpenChange={onClose} {...rest}>
    <Dialog.Portal>
      <Dialog.Overlay className={s.overlay} />
      <Dialog.Content className={clsx(s.content, className)}>
        <Dialog.Title className={s.title}>
          <Typography variant={"h1"} color={"light"}>
            {modalTitle}
          </Typography>
        </Dialog.Title>
        <hr className={s.separator} />
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
