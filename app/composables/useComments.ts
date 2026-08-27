import type {
  Comment,
  CommentsMeta,
  CommentsResponse,
} from '~~/shared/types/Comment'

const PAGE_SIZE = 5

export default function () {
  const comments = ref<Comment[]>([])
  const meta = ref<CommentsMeta>({ total: 0, count: 0, hasMore: false })
  const isLoading = ref<boolean>(false)
  const isFetchingMore = ref<boolean>(false)
  const error = ref<string | null>(null)

  let abortController: AbortController | null = null

  const fetchComments = async (
    id: number | string,
    { offset = 0, limit = PAGE_SIZE }: { offset?: number; limit?: number } = {}
  ) => {
    return await $fetch<CommentsResponse>(`/api/comments/${id}`, {
      query: { offset, limit },
      signal: abortController?.signal,
    })
  }

  const getComments = async (id: number | string) => {
    abortController?.abort()
    abortController = new AbortController()

    isLoading.value = true
    error.value = null

    try {
      const response = await fetchComments(id, { offset: 0 })

      comments.value = response.data || []
      meta.value = response.meta || { total: 0, count: 0, hasMore: false }
    } catch (e: any) {
      if (e.name !== 'AbortError') {
        error.value =
          e.statusMessage || 'Wystąpił błąd podczas pobierania komentarzy.'
        comments.value = []
      }
    } finally {
      isLoading.value = false
    }
  }

  const loadMoreComments = async (id: number | string) => {
    if (isFetchingMore.value || !meta.value.hasMore) return

    isFetchingMore.value = true
    error.value = null

    try {
      const response = await fetchComments(id, {
        offset: comments.value.length,
      })

      comments.value = [...comments.value, ...(response.data || [])]
      meta.value = response.meta || meta.value
    } catch (e: any) {
      error.value =
        e.statusMessage || 'Wystąpił bład podczas pobierania komentarzy.'
    } finally {
      isFetchingMore.value = false
    }
  }

  return {
    comments,
    meta,
    isLoading,
    isFetchingMore,
    error,
    getComments,
    loadMoreComments,
  }
}
