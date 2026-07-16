import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TaskGetAllInput = z.object({
  project: z.string().optional(),
  limit: z.number().int().optional(),
})

export const TaskGetAllOutput = z.record(z.string(), z.unknown())

export const taskGetAll = pikkuSessionlessFunc({
  description: "Task get all",
  input: TaskGetAllInput,
  output: TaskGetAllOutput,
  func: async ({ asana }, data) => {
    return asana.call("GET", "/tasks", data) as any
  },
})
