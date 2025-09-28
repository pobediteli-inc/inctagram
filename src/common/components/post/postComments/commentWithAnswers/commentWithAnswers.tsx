import { Avatar, Button, Textarea, Typography } from "common/components/index";
import { formatRelativeTime } from "common/utils/dateUtils";
import Image from "next/image";
import { useState } from "react";
import {
  useCreateAnswerCommentMutation,
  useGetCommentAnswersQuery,
  useUpdateLikeStatusAnswerMutation,
  useUpdateLikeStatusCommentMutation,
} from "store/services/api/posts";
import { AnswerItems, CommentItems } from "store/services/api/publicPosts";
import answerLine from "public/icons/svg/answer-line.svg";
import s from "common/components/post/postComments/postComments.module.css";
import { Heart, HeartOutline } from "assets/icons";

type Props = {
  postId: number;
  comment: CommentItems;
};

export const CommentWithAnswers = ({ comment, postId }: Props) => {
  const [answerText, setAnswerText] = useState("");
  const [isAnswerFieldOpen, setIsAnswerFieldOpen] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);
  const [createAnswerComment] = useCreateAnswerCommentMutation();
  const [updateLikeStatusComment] = useUpdateLikeStatusCommentMutation();
  const [updateLikeStatusAnswer] = useUpdateLikeStatusAnswerMutation();
  const { data: answers } = useGetCommentAnswersQuery({ postId, commentId: comment.id }, { skip: !showAnswers });

  const handleCreateAnswer = async () => {
    if (!answerText.trim() && (answerText.length > 300 || answerText.length < 1)) return;

    try {
      await createAnswerComment({
        postId,
        commentId: comment.id,
        content: answerText,
      }).unwrap();

      setAnswerText("");
      setIsAnswerFieldOpen(false);
    } catch {
      return null;
    }
  };

  const handleUpdateLikeStatusComment = async () => {
    try {
      await updateLikeStatusComment({
        postId,
        commentId: comment.id,
        likeStatus: comment.isLiked ? "NONE" : "LIKE",
      }).unwrap();
    } catch {
      return null;
    }
  };

  const handleUpdateLikeStatusAnswer = async (answerId: number, isLiked: boolean) => {
    try {
      await updateLikeStatusAnswer({
        postId,
        commentId: comment.id,
        answerId,
        likeStatus: isLiked ? "NONE" : "LIKE",
      }).unwrap();
    } catch {
      return null;
    }
  };

  return (
    <div className={s.commentWithLike}>
      <div className={s.avatarWithComment}>
        <div className={s.commentAvatarWrapper}>
          <Avatar src={comment.from.avatars[0]?.url} />
        </div>
        <div className={s.commentWrapper}>
          <Typography variant={"bold_14"}>
            {comment.from.username} <span className={s.commentText}>{comment.content}</span>
          </Typography>
          <div className={s.timeLikeAnswerWrapper}>
            <Typography variant={"small"} color={"dark"} className={s.timeLikeAnswerText}>
              {formatRelativeTime(comment.createdAt)}
            </Typography>
            {comment.likeCount > 0 && (
              <Typography variant={"bold_small"} color={"dark"} className={s.timeLikeAnswerText}>
                Like: {comment.likeCount}
              </Typography>
            )}
            <Typography
              variant={"bold_small"}
              color={"dark"}
              className={s.timeLikeAnswerText}
              onClick={() => setIsAnswerFieldOpen((prev) => !prev)}
            >
              <span className={s.answerBtn}>Answer</span>
            </Typography>
          </div>

          {isAnswerFieldOpen && (
            <div className={s.textareaWithButton}>
              <Textarea
                title=""
                value={answerText}
                onChange={(e) => setAnswerText(e.target.value)}
                autoFocus
                className={s.textarea}
              />
              <Button onClick={handleCreateAnswer} variant="link">
                Publish
              </Button>
            </div>
          )}

          {comment.answerCount > 0 && (
            <div className={s.answersWrapper}>
              <Image src={answerLine} alt="Line Of Answers" width={24} height={1} className={s.answerLine} />
              <Typography
                variant={"bold_small"}
                color={"dark"}
                className={s.viewAnswersBtn}
                onClick={() => setShowAnswers((prev) => !prev)}
              >
                {showAnswers ? "Hide Answers" : "View Answers"} ({comment.answerCount})
              </Typography>
            </div>
          )}

          {showAnswers && (
            <div className={s.answersList}>
              {answers?.items?.map((answer: AnswerItems) => (
                <div key={answer.id} className={s.answerWithLike}>
                  <div className={s.avatarWithComment}>
                    <div className={s.commentAvatarWrapper}>
                      <Avatar src={answer.from.avatars[0]?.url} />
                    </div>
                    <div className={s.answerWrapper}>
                      <Typography variant={"bold_14"}>
                        {answer.from.username} <span className={s.commentText}>{answer.content}</span>
                      </Typography>
                      <div className={s.timeLikeAnswerWrapper}>
                        <Typography variant={"small"} color={"dark"} className={s.timeLikeAnswerText}>
                          {formatRelativeTime(answer.createdAt)}
                        </Typography>
                        {answer.likeCount > 0 && (
                          <Typography variant={"bold_small"} color={"dark"} className={s.timeLikeAnswerText}>
                            Like: {answer.likeCount}
                          </Typography>
                        )}
                      </div>
                    </div>
                  </div>
                  {answer.isLiked ? (
                    <Heart
                      className={s.answerLiked}
                      width={16}
                      height={16}
                      onClick={() => handleUpdateLikeStatusAnswer(answer.id, answer.isLiked)}
                    />
                  ) : (
                    <HeartOutline
                      className={s.answerLike}
                      width={16}
                      height={16}
                      onClick={() => handleUpdateLikeStatusAnswer(answer.id, answer.isLiked)}
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {comment.isLiked ? (
        <Heart className={s.liked} width={16} height={16} onClick={handleUpdateLikeStatusComment} />
      ) : (
        <HeartOutline className={s.like} width={16} height={16} onClick={handleUpdateLikeStatusComment} />
      )}
    </div>
  );
};
