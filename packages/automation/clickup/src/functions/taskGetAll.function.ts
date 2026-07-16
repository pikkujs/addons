import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TaskGetAllInput = z.object({
  listId: z.string(),
  archived: z.boolean().optional(),
})

export const TaskGetAllOutput = z.record(z.string(), z.unknown())

export const taskGetAll = pikkuSessionlessFunc({
  description: "Task get all",
  input: TaskGetAllInput,
  output: TaskGetAllOutput,
  func: async ({ clickup }, data) => {
    return clickup.call("GET", "/list/{listId}/task", data) as any
  },
})
