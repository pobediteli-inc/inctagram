import { Avatar, BaseModal, Button, Typography, ControlledTextarea } from "common/components";
import s from "./updatePostForm.module.css";
import { LIMITS } from "common/constants/limits";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdatePostMutation } from "store/services/api/posts/postsApi";
import { handleErrors } from "common/utils/handleErrors";
import { useAppDispatch } from "common/hooks/useAppDispatch";
import React, { useState } from "react";
import { CloseModal } from "./closeModal";
import Image from "next/image";

type Props = {
  isOpen: boolean;
  avatar: string;
  userName: string;
  description: string;
  photoPreview: string;
  postId: number;
  handleClose: () => void;
  handleUpdate: (postId: number, description: string) => void;
};

const updateDescriptionSchema = z.object({
  description: z.string().max(LIMITS.MAX_DESCRIPTION_COUNT),
});

type UpdateDescriptionFormValues = z.infer<typeof updateDescriptionSchema>;

export const UpdatePostForm = ({
  isOpen,
  avatar,
  userName,
  description,
  postId,
  handleClose,
  handleUpdate,
  photoPreview,
}: Props) => {
  const [updatePost] = useUpdatePostMutation();
  const dispatch = useAppDispatch();
  const [closeModalIsOpen, setCloseModalIsOpen] = useState(false);
  const { control, handleSubmit, reset, formState } = useForm<UpdateDescriptionFormValues>({
    resolver: zodResolver(updateDescriptionSchema),
    defaultValues: { description },
  });
  const onSubmit = handleSubmit(async (data) => {
    handleClose();
    try {
      await updatePost({ description: data.description || "", postId });
      handleUpdate(postId, data.description);
      handleClose();
    } catch (e) {
      handleErrors(e, dispatch);
    }
  });

  const handleCloseWithReset = () => {
    reset();
    setCloseModalIsOpen(false);
    handleClose();
  };

  const handleFormModalCLose = () => {
    if (formState.isDirty) {
      setCloseModalIsOpen(true);
    } else {
      handleClose();
    }
  };

  return (
    <BaseModal modalTitle={"Edit Post"} open={isOpen} onClose={handleFormModalCLose} className={s.modal}>
      <CloseModal
        isOpen={closeModalIsOpen}
        handleConfirm={handleCloseWithReset}
        handleCancel={() => setCloseModalIsOpen(false)}
      />
      <div className={s.container}>
        <div>
          <Image src={photoPreview} alt="Photo preview" width={490} height={504} style={{ objectFit: "cover" }} />
        </div>
        <form className={s.form} onSubmit={onSubmit}>
          <div className={s.userInfo}>
            <Avatar src={avatar} />
            <Typography variant={"h3"}>{userName}</Typography>
          </div>
          <ControlledTextarea
            className={s.textArea}
            title={"Update publication description"}
            maxLength={LIMITS.MAX_DESCRIPTION_COUNT}
            name={"description"}
            control={control}
          />
          <Button className={s.submit}>Save Changes</Button>
        </form>
      </div>
    </BaseModal>
  );
};
