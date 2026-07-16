import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TaskDeleteInput = z.object({
  taskListId: z.string(),
  taskId: z.string(),
})

export const TaskDeleteOutput = z.record(z.string(), z.unknown())

export const taskDelete = pikkuSessionlessFunc({
  description: "Delete a task",
  input: TaskDeleteInput,
  output: TaskDeleteOutput,
  func: async ({ microsoftToDo }, data) => {
    return microsoftToDo.call("DELETE", "/todo/lists/{taskListId}/tasks/{taskId}", data) as any
  },
})
