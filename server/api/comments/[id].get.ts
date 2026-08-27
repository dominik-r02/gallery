import type { Comment } from '~~/shared/types/Comment'

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
      !Number.isNaN(parsedLimit) && parsedLimit > 0 ? parsedLimit : 5
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

      let filteredComments = comments.filter(
        (comment) => Number(comment.photoId) === photoId
      )

      filteredComments = filteredComments.sort((a, b) => {
        const timeA = new Date(a.createdAt).getTime()
        const timeB = new Date(b.createdAt).getTime()
        return sortDir === 'desc' ? timeB - timeA : timeA - timeB
      })

      const totalCount = filteredComments.length
      if (limit && limit > 0) {
        filteredComments = filteredComments.slice(0, limit)
      }

      return {
        data: filteredComments,
        meta: {
          total: totalCount,
          count: filteredComments.length,
          hasMore: totalCount > filteredComments.length,
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
      return `${id}-${query.limit || 'all'}-${query.sort || 'desc'}`
    },
  }
)
