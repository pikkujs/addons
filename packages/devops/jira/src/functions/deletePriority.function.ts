// Issue priorities — This resource represents issue priorities. Use it to get, create and update issue priorities and details for individual issue priorities.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError } from '@pikku/core/errors'

export const DeletePriorityInput = z.object({
  id: z.string().describe("The ID of the issue priority."),
  replaceWith: z.string().describe("The ID of the issue priority that will replace the currently selected resolution."),
})

export const deletePriority = pikkuSessionlessFunc({
  description: "Deletes an issue priority.\n\nThis operation is [asynchronous](#async). Follow the `location` link in the response to determine the status of the task and use [Get task](#api-rest-api-3-task-taskId-get) to obtain subsequent updates.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: DeletePriorityInput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError],
  func: async ({ jira }, data) => {
    return jira.call("DELETE", "/rest/api/3/priority/{id}", data)
  },
})
