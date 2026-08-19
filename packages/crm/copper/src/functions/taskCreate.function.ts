import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const TaskCreateInput = z.object({
  name: z.string().optional(),
  details: z.string().optional(),
  status: z.string().optional(),
})

export const TaskCreateOutput = z.record(z.string(), z.unknown())

export const taskCreate = pikkuSessionlessFunc({
  description: "Create a task",
  input: TaskCreateInput,
  output: TaskCreateOutput,
  func: async ({ copper }, data) => {
    return copper.call("POST", "/tasks", data) as any
  },
})
