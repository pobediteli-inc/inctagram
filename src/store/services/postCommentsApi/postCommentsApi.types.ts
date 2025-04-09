export type Comments = {
    pageSize: number
    totalCount: number
    notReadCount: number
    items: Comment[]
}
  
export type Comment = {
    id: number
    postId: number
    from: CommentAuthor
    content: string
    createdAt: string
    answerCount: number
    likeCount: number
    isLiked: boolean
}
  
export type CommentAuthor = {
    id: number
    username: string
    avatars: Avatar[]
}
  
export type Avatar = Record<string, unknown>
