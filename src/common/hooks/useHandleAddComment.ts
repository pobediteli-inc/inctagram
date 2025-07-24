import { useCreateCommentMutation } from "store/services/api/posts/postsApi";

export const useHandleAddComment = () => {
  const [createComment] = useCreateCommentMutation();

  const handleAddComment = async (postId: number, commentText: string) => {
    try {
      await createComment({ postId, content: commentText }).unwrap();
    } catch (error) {
      console.error("Error while creating comment:", error);
    }
  };

  return handleAddComment;
};
