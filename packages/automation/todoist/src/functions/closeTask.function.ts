import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CloseTaskInput = z.object({
  taskId: z.number().int().describe("The ID of the task to close."),
})

export const closeTask = pikkuSessionlessFunc({
  description: "Closes a task. Regular tasks are marked complete and moved to history, along with their subtasks. Tasks with recurring due dates will be scheduled to their next occurrence.\n\nA successful response has 204 No Content status and an empty body.",
  input: CloseTaskInput,
  func: async ({ todoist }, data) => {
    return todoist.call("POST", "/tasks/{taskId}/close", data)
  },
})
