// Projects — This resource represents projects. Use it to get, create, update, and delete projects. Also get statuses available to a project, a project's notification schemes, and update a project's type.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError, NotFoundError } from '@pikku/core/errors'

export const DeleteProjectInput = z.object({
  projectIdOrKey: z.string().describe("The project ID or project key (case sensitive)."),
  enableUndo: z.boolean().optional().default(false).describe("Whether this project is placed in the Jira recycle bin where it will be available for restoration."),
})

export const deleteProject = pikkuSessionlessFunc({
  description: "Deletes a project.\n\nYou can't delete a project if it's archived. To delete an archived project, restore the project and then delete it. To restore a project, use the Jira UI.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: DeleteProjectInput,
  errors: [UnauthorizedError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("DELETE", "/rest/api/3/project/{projectIdOrKey}", data)
  },
})
