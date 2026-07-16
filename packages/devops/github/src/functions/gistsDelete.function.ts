// gists — View, modify your gists.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const GistsDeleteInput = z.object({
  gist_id: z.string().describe("The unique identifier of the gist."),
})

export const gistsDelete = pikkuSessionlessFunc({
  input: GistsDeleteInput,
  errors: [ForbiddenError, NotFoundError],
  func: async ({ github }, data) => {
    return github.call("DELETE", "/gists/{gist_id}", data)
  },
})
