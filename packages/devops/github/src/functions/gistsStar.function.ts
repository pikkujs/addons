// gists — View, modify your gists.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const GistsStarInput = z.object({
  gist_id: z.string().describe("The unique identifier of the gist."),
})

export const gistsStar = pikkuSessionlessFunc({
  description: "Note that you'll need to set `Content-Length` to zero when calling out to this endpoint. For more information, see \"[HTTP verbs](https://docs.github.com/rest/overview/resources-in-the-rest-api#http-verbs).\"",
  input: GistsStarInput,
  errors: [ForbiddenError, NotFoundError],
  func: async ({ github }, data) => {
    return github.call("PUT", "/gists/{gist_id}/star", data)
  },
})
