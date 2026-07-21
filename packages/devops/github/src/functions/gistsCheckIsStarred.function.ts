// gists — View, modify your gists.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const GistsCheckIsStarredInput = z.object({
  gist_id: z.string().describe("The unique identifier of the gist."),
})

export const gistsCheckIsStarred = pikkuSessionlessFunc({
  input: GistsCheckIsStarredInput,
  errors: [ForbiddenError, NotFoundError],
  func: async ({ github }, data) => {
    return github.call("GET", "/gists/{gist_id}/star", data)
  },
})
