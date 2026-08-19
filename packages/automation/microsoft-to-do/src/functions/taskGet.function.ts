import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const TaskGetInput = z.object({
  taskListId: z.string(),
  taskId: z.string(),
})

export const TaskGetOutput = z.record(z.string(), z.unknown())

export const taskGet = pikkuSessionlessFunc({
  description: "Get a task",
  input: TaskGetInput,
  output: TaskGetOutput,
  func: async ({ microsoftToDo }, data) => {
    return microsoftToDo.call("GET", "/todo/lists/{taskListId}/tasks/{taskId}", data) as any
  },
})
