// Issue priorities — This resource represents issue priorities. Use it to get, create and update issue priorities and details for individual issue priorities.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const SetDefaultPriorityInput = z.object({
  id: z.string().describe("The ID of the new default issue priority. Must be an existing ID or null. Setting this to null erases the default priority setting."),
})

export const SetDefaultPriorityOutput = z.unknown()

export const setDefaultPriority = pikkuSessionlessFunc({
  description: "Sets default issue priority.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: SetDefaultPriorityInput,
  output: SetDefaultPriorityOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("PUT", "/rest/api/3/priority/default", data) as any
  },
})
