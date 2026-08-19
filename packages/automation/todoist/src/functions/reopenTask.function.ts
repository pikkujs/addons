import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ReopenTaskInput = z.object({
  taskId: z.number().int().describe("The ID of the task to reopen."),
})

export const reopenTask = pikkuSessionlessFunc({
  description: "Reopens a task. Any ancestor items or sections will also be marked as uncomplete and restored from history. The reinstated items and sections will appear at the end of the list within their parent, after any previously active items.\n\nA successful response has 204 No Content status...",
  input: ReopenTaskInput,
  func: async ({ todoist }, data) => {
    return todoist.call("POST", "/tasks/{taskId}/reopen", data)
  },
})
