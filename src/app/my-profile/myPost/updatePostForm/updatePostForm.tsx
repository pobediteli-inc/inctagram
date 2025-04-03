import { Avatar, BaseModal, Button, Typography, ControlledTextarea } from "common/components";
import s from "./updatePostForm.module.css";
import { LIMITS } from "constants/limits";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdatePostMutation } from "store/services/posts/postsApi";
import { handleErrors } from "common/utils/handleErrors";
import { useAppDispatch } from "common/hooks/useAppDispatch";

// TODO make photoPreview required
type Props = {
  isOpen: boolean;
  avatar: string;
  userName: string;
  description: string;
  photoPreview?: string;
  postId: number;
  handleClose: () => void;
};

const updateDescriptionSchema = z.object({
  description: z.string().max(LIMITS.MAX_DESCRIPTION_COUNT).optional(),
});

type UpdateDescriptionFormValues = z.infer<typeof updateDescriptionSchema>;

export const UpdatePostForm = ({ isOpen, avatar, userName, description, postId, handleClose }: Props) => {
  // const [updatePost] = useUpdatePostMutation();
  // const dispatch = useAppDispatch();
  const { control, handleSubmit } = useForm<UpdateDescriptionFormValues>({
    resolver: zodResolver(updateDescriptionSchema),
  });
  const onSubmit = handleSubmit(async (data) => {
    console.log("data");
    // try {
    //   await updatePost({ description: data.description || "", postId });
    // handleClose()
    // } catch (e) {
    //   handleErrors(e, dispatch);
    // }
  });
  return (
    <BaseModal modalTitle={"Edit Post"} open={isOpen} onClose={handleClose} className={s.modal}>
      <div className={s.container}>
        <div>photo preview</div>
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
            defaultValue={description}
            control={control}
          />
          <Button className={s.submit}>Save Changes</Button>
        </form>
      </div>
    </BaseModal>
  );
};
