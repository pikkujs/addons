// Tasks — This resource represents a [long-running asynchronous tasks](#async-operations). Use it to obtain details about the progress of a long-running task or cancel a long-running task.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const CancelTaskInput = z.object({
  taskId: z.string().describe("The ID of the task."),
})

export const CancelTaskOutput = z.unknown()

export const cancelTask = pikkuSessionlessFunc({
  description: "Cancels a task.\n\n**[Permissions](#permissions) required:** either of:\n\n *  *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).\n *  Creator of the task.",
  input: CancelTaskInput,
  output: CancelTaskOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("POST", "/rest/api/3/task/{taskId}/cancel", data) as any
  },
})
