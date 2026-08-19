// Projects — This resource represents projects. Use it to get, create, update, and delete projects. Also get statuses available to a project, a project's notification schemes, and update a project's type.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, NotFoundError } from '@pikku/core/errors'

export const RestoreInput = z.object({
  projectIdOrKey: z.string().describe("The project ID or project key (case sensitive)."),
})

export const RestoreOutput = z.any()

export const restore = pikkuSessionlessFunc({
  description: "Restores a project that has been archived or placed in the Jira recycle bin.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: RestoreInput,
  output: RestoreOutput,
  errors: [BadRequestError, UnauthorizedError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("POST", "/rest/api/3/project/{projectIdOrKey}/restore", data) as any
  },
})
