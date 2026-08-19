// Projects — This resource represents projects. Use it to get, create, update, and delete projects. Also get statuses available to a project, a project's notification schemes, and update a project's type.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, NotFoundError } from '@pikku/core/errors'

export const DeleteProjectAsynchronouslyInput = z.object({
  projectIdOrKey: z.string().describe("The project ID or project key (case sensitive)."),
})

export const deleteProjectAsynchronously = pikkuSessionlessFunc({
  description: "Deletes a project asynchronously.\n\nThis operation is:\n\n *  transactional, that is, if part of the delete fails the project is not deleted.\n *  [asynchronous](#async). Follow the `location` link in the response to determine the status of the task and use [Get task](#api-rest-api-3-task-taskId-get) to obtain subsequent updates.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: DeleteProjectAsynchronouslyInput,
  errors: [BadRequestError, UnauthorizedError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("POST", "/rest/api/3/project/{projectIdOrKey}/delete", data)
  },
})
