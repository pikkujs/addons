import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const TaskGetAllInput = z.object({
  taskListId: z.string(),
  $top: z.number().int().optional(),
})

export const TaskGetAllOutput = z.record(z.string(), z.unknown())

export const taskGetAll = pikkuSessionlessFunc({
  description: "List tasks",
  input: TaskGetAllInput,
  output: TaskGetAllOutput,
  func: async ({ microsoftToDo }, data) => {
    return microsoftToDo.call("GET", "/todo/lists/{taskListId}/tasks", data) as any
  },
})
