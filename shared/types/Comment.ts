export type Comment = {
  id: string
  photoId: string
  author: string
  avatar: string
  content: string
  createdAt: string
}

export type CommentsMeta = {
  total: number
  count: number
  hasMore: boolean
}

export type CommentsResponse = {
  data: Comment[]
  meta: CommentsMeta
}
