// Tasks — This resource represents a [long-running asynchronous tasks](#async-operations). Use it to obtain details about the progress of a long-running task or cancel a long-running task.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const GetTaskInput = z.object({
  taskId: z.string().describe("The ID of the task."),
})

export const GetTaskOutput = z.object({
  description: z.string().optional().describe("The description of the task."),
  elapsedRuntime: z.number().int().describe("The execution time of the task, in milliseconds."),
  finished: z.number().int().optional().describe("A timestamp recording when the task was finished."),
  id: z.string().describe("The ID of the task."),
  lastUpdate: z.number().int().describe("A timestamp recording when the task progress was last updated."),
  message: z.string().optional().describe("Information about the progress of the task."),
  progress: z.number().int().describe("The progress of the task, as a percentage complete."),
  result: z.unknown().optional().describe("The result of the task execution."),
  self: z.string().url().describe("The URL of the task."),
  started: z.number().int().optional().describe("A timestamp recording when the task was started."),
  status: z.enum(["ENQUEUED", "RUNNING", "COMPLETE", "FAILED", "CANCEL_REQUESTED", "CANCELLED", "DEAD"]).describe("The status of the task."),
  submitted: z.number().int().describe("A timestamp recording when the task was submitted."),
  submittedBy: z.number().int().describe("The ID of the user who submitted the task."),
}).describe("Details about a task.")

export const getTask = pikkuSessionlessFunc({
  description: "Returns the status of a [long-running asynchronous task](#async).\n\nWhen a task has finished, this operation returns the JSON blob applicable to the task. See the documentation of the operation that created the task for details. Task details are not permanently retained. As of September 2019, details are retained for 14 days although this period may change without notice.\n\n**[Permissions](#permissions) required:** either of:\n\n *  *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).\n *  Creator of the task.",
  input: GetTaskInput,
  output: GetTaskOutput,
  errors: [UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/task/{taskId}", data) as any
  },
})
