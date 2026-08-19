import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const TaskCreateInput = z.object({
  taskListId: z.string(),
  title: z.string().optional(),
  importance: z.string().optional(),
  status: z.string().optional(),
})

export const TaskCreateOutput = z.record(z.string(), z.unknown())

export const taskCreate = pikkuSessionlessFunc({
  description: "Create a task",
  input: TaskCreateInput,
  output: TaskCreateOutput,
  func: async ({ microsoftToDo }, data) => {
    return microsoftToDo.call("POST", "/todo/lists/{taskListId}/tasks", data) as any
  },
})
