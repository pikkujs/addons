// gists — View, modify your gists.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const GistsDeleteCommentInput = z.object({
  gist_id: z.string().describe("The unique identifier of the gist."),
  comment_id: z.number().int().describe("The unique identifier of the comment."),
})

export const gistsDeleteComment = pikkuSessionlessFunc({
  input: GistsDeleteCommentInput,
  errors: [ForbiddenError, NotFoundError],
  func: async ({ github }, data) => {
    return github.call("DELETE", "/gists/{gist_id}/comments/{comment_id}", data)
  },
})
