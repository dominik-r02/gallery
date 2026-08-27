import type { Comment } from '~~/shared/types/Comment'

const DEFAULT_LIMIT = 5

export default defineCachedEventHandler(
  async (event) => {
    const rawId = getRouterParam(event, 'id')
    const photoId = Number(rawId)

    if (!rawId || Number.isNaN(photoId) || photoId <= 0) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Bad Request: photoId must be a valid positive number',
      })
    }

    const query = getQuery(event)

    const parsedLimit = Number(query.limit)
    const limit =
      !Number.isNaN(parsedLimit) && parsedLimit > 0
        ? parsedLimit
        : DEFAULT_LIMIT

    const parsedOffset = Number(query.offset)
    const offset =
      !Number.isNaN(parsedOffset) && parsedOffset >= 0 ? parsedOffset : 0

    const sortDir = query.sort === 'asc' ? 'asc' : 'desc'

    try {
      const storage = useStorage('assets:server')
      const comments = await storage.getItem<Comment[]>('comments.json')

      if (!comments) {
        throw createError({
          statusCode: 404,
          statusMessage: 'Comments data not found in server assets',
        })
      }

      const filteredComments = comments
        .filter((comment) => Number(comment.photoId) === photoId)
        .sort((a, b) => {
          const timeA = new Date(a.createdAt).getTime()
          const timeB = new Date(b.createdAt).getTime()
          return sortDir === 'desc' ? timeB - timeA : timeA - timeB
        })

      const totalCount = filteredComments.length
      const pageComments = filteredComments.slice(offset, offset + limit)

      return {
        data: pageComments,
        meta: {
          total: totalCount,
          count: offset + pageComments.length,
          hasMore: offset + pageComments.length < totalCount,
        },
      }
    } catch (error: unknown) {
      if (error instanceof Error && (error as any).statusCode) throw error
      throw createError({
        statusCode: 500,
        statusMessage: 'Internal Server Error: Unable to read comments',
        cause: error,
      })
    }
  },
  {
    maxAge: 3600,
    name: 'comments-cache',
    getKey: (event) => {
      const id = getRouterParam(event, 'id')
      const query = getQuery(event)
      return `${id}-${query.offset || 0}-${query.limit || DEFAULT_LIMIT}-${query.sort || 'desc'}`
    },
  }
)
