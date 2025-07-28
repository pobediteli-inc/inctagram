import { useCreateCommentMutation } from "store/services/api/posts/postsApi";
import { handleErrors } from "common/utils";
import { useAppDispatch } from "common/hooks/useAppDispatch";

export const useHandleAddComment = () => {
  const [createComment] = useCreateCommentMutation();
  const dispatch = useAppDispatch();

  const handleAddComment = async (postId: number, commentText: string) => {
    try {
      await createComment({ postId, content: commentText }).unwrap();
    } catch (error) {
      handleErrors(error, dispatch);
    }
  };

  return handleAddComment;
};
