import type { Comment } from '~~/shared/types/Comment'

export default function () {
  const comments = ref<Comment[]>([])
  const meta = ref({ total: 0, count: 0, hasMore: false })
  const isLoading = ref<boolean>(false)
  const error = ref<string | null>(null)

  const getComments = async (id: number | string) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await $fetch<any>(`/api/comments/${id}`)

      comments.value = response.data || []
      meta.value = response.meta || { total: 0, count: 0, hasMore: false }
    } catch (e: any) {
      error.value =
        e.statusMessage || 'Wystąpił błąd podczas pobierania komentarzy.'
      comments.value = []
    } finally {
      isLoading.value = false
    }
  }

  return {
    comments,
    meta,
    isLoading,
    error,
    getComments,
  }
}
