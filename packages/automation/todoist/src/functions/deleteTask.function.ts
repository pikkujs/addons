import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const DeleteTaskInput = z.object({
  taskId: z.number().int().describe("The ID of the task to delete."),
})

export const deleteTask = pikkuSessionlessFunc({
  description: "Deletes a task. \n\nA successful response has 204 No Content status and an empty body.",
  input: DeleteTaskInput,
  func: async ({ todoist }, data) => {
    return todoist.call("DELETE", "/tasks/{taskId}", data)
  },
})
