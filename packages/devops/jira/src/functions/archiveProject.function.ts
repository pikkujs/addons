// Projects — This resource represents projects. Use it to get, create, update, and delete projects. Also get statuses available to a project, a project's notification schemes, and update a project's type.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const ArchiveProjectInput = z.object({
  projectIdOrKey: z.string().describe("The project ID or project key (case sensitive)."),
})

export const ArchiveProjectOutput = z.unknown()

export const archiveProject = pikkuSessionlessFunc({
  description: "Archives a project. You can't delete a project if it's archived. To delete an archived project, restore the project and then delete it. To restore a project, use the Jira UI.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: ArchiveProjectInput,
  output: ArchiveProjectOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("POST", "/rest/api/3/project/{projectIdOrKey}/archive", data) as any
  },
})
