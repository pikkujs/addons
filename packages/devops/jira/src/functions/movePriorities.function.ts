// Issue priorities — This resource represents issue priorities. Use it to get, create and update issue priorities and details for individual issue priorities.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const MovePrioritiesInput = z.object({
  after: z.string().optional().describe("The ID of the priority. Required if `position` isn't provided."),
  ids: z.array(z.string()).describe("The list of issue IDs to be reordered. Cannot contain duplicates nor after ID."),
  position: z.string().optional().describe("The position for issue priorities to be moved to. Required if `after` isn't provided."),
})

export const MovePrioritiesOutput = z.unknown()

export const movePriorities = pikkuSessionlessFunc({
  description: "Changes the order of issue priorities.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: MovePrioritiesInput,
  output: MovePrioritiesOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("PUT", "/rest/api/3/priority/move", data) as any
  },
})
