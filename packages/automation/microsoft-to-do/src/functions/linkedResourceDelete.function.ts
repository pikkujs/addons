import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const LinkedResourceDeleteInput = z.object({
  taskListId: z.string(),
  taskId: z.string(),
  linkedResourceId: z.string(),
})

export const LinkedResourceDeleteOutput = z.record(z.string(), z.unknown())

export const linkedResourceDelete = pikkuSessionlessFunc({
  description: "Delete a linked resource",
  input: LinkedResourceDeleteInput,
  output: LinkedResourceDeleteOutput,
  func: async ({ microsoftToDo }, data) => {
    return microsoftToDo.call("DELETE", "/todo/lists/{taskListId}/tasks/{taskId}/linkedResources/{linkedResourceId}", data) as any
  },
})
