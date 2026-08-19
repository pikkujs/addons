// Issue resolutions — This resource represents issue resolution values. Use it to obtain a list of all issue resolution values and the details of individual resolution values.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const MoveResolutionsInput = z.object({
  after: z.string().optional().describe("The ID of the resolution. Required if `position` isn't provided."),
  ids: z.array(z.string()).describe("The list of resolution IDs to be reordered. Cannot contain duplicates nor after ID."),
  position: z.string().optional().describe("The position for issue resolutions to be moved to. Required if `after` isn't provided."),
})

export const MoveResolutionsOutput = z.unknown()

export const moveResolutions = pikkuSessionlessFunc({
  description: "Changes the order of issue resolutions.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: MoveResolutionsInput,
  output: MoveResolutionsOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("PUT", "/rest/api/3/resolution/move", data) as any
  },
})
