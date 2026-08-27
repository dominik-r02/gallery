import { describe, it, expect, vi, beforeEach } from 'vitest'
import useComments from '../../app/composables/useComments'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import type { CommentsResponse, Comment } from '../../shared/types/Comment'

const { mockFetch } = vi.hoisted(() => {
  return { mockFetch: vi.fn() }
})

mockNuxtImport('$fetch', () => mockFetch)

const mockComment: Comment = {
  id: '1',
  photoId: '1',
  author: 'Janko Chanowski',
  avatar: 'xyz.jpg',
  content: 'Super zdjęcie - podoba mi się',
  createdAt: '2026',
}
const successResponse: CommentsResponse = {
  data: [mockComment],
  meta: { total: 10, count: 1, hasMore: true },
}

describe('useComments', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('Has proper initial state', () => {
    const { comments, meta, isLoading, isFetchingMore, error } = useComments()

    expect(comments.value).toEqual([])
    expect(meta.value.total).toBe(0)
    expect(isLoading.value).toBe(false)
    expect(isFetchingMore.value).toBe(false)
    expect(error.value).toBeNull()
  })

  it('GetComments set proper response state after successful fetch', async () => {
    mockFetch.mockResolvedValueOnce(successResponse)
    const { comments, meta, getComments, isLoading, error } = useComments()

    const fetchPromise = getComments(1)

    expect(isLoading.value).toBe(true)

    await fetchPromise

    expect(mockFetch).toHaveBeenCalledWith(
      '/api/comments/1',
      expect.any(Object)
    )
    expect(comments.value).toEqual(successResponse.data)
    expect(meta.value).toEqual(successResponse.meta)
    expect(isLoading.value).toBe(false)
    expect(error.value).toBeNull()
  })

  it('GetComments resets error state after every fetch', async () => {
    mockFetch.mockResolvedValueOnce(successResponse)
    const { getComments, error } = useComments()

    error.value = 'Some error'
    const fetchPromise = getComments(1)

    expect(error.value).toBeNull()
    await fetchPromise
  })

  it('GetComments sets error state after failed fetch', async () => {
    const { getComments, comments, error, isLoading } = useComments()

    comments.value = [mockComment]

    mockFetch.mockRejectedValueOnce({ statusMessage: 'API Error' })
    await getComments(1)

    expect(error.value).toBe('API Error')
    expect(comments.value).toEqual([])
    expect(isLoading.value).toBe(false)
  })

  it('LoadMoreComments indeed loads more comments', async () => {
    mockFetch.mockResolvedValueOnce(successResponse)
    const { comments, meta, loadMoreComments } = useComments()

    comments.value = [{ ...mockComment, id: '0' }]
    meta.value.hasMore = true

    await loadMoreComments(1)

    expect(comments.value.length).toBe(2)
    expect(comments.value[1]?.id).toBe('1')

    expect(mockFetch).toHaveBeenCalledWith(
      '/api/comments/1',
      expect.objectContaining({
        query: expect.objectContaining({ offset: 1 }),
      })
    )
  })

  it('LoadMoreComments does not fetch when there are no more comments', async () => {
    const { loadMoreComments, meta } = useComments()
    meta.value.hasMore = false

    await loadMoreComments(1)

    expect(mockFetch).not.toHaveBeenCalled()
  })

  it('LoadMoreComments does not fetch when fetch is aborted', async () => {
    mockFetch.mockRejectedValueOnce({ name: 'AbortError' })
    const { getComments, error } = useComments()

    await getComments(1)

    expect(error.value).toBeNull()
  })
})
