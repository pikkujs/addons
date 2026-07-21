// Issue resolutions — This resource represents issue resolution values. Use it to obtain a list of all issue resolution values and the details of individual resolution values.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError } from '@pikku/core/errors'

export const DeleteResolutionInput = z.object({
  id: z.string().describe("The ID of the issue resolution."),
  replaceWith: z.string().describe("The ID of the issue resolution that will replace the currently selected resolution."),
})

export const deleteResolution = pikkuSessionlessFunc({
  description: "Deletes an issue resolution.\n\nThis operation is [asynchronous](#async). Follow the `location` link in the response to determine the status of the task and use [Get task](#api-rest-api-3-task-taskId-get) to obtain subsequent updates.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: DeleteResolutionInput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError],
  func: async ({ jira }, data) => {
    return jira.call("DELETE", "/rest/api/3/resolution/{id}", data)
  },
})
