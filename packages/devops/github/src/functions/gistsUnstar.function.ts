// gists — View, modify your gists.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const GistsUnstarInput = z.object({
  gist_id: z.string().describe("The unique identifier of the gist."),
})

export const gistsUnstar = pikkuSessionlessFunc({
  input: GistsUnstarInput,
  errors: [ForbiddenError, NotFoundError],
  func: async ({ github }, data) => {
    return github.call("DELETE", "/gists/{gist_id}/star", data)
  },
})
