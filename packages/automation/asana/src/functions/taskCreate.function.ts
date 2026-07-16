import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TaskCreateInput = z.object({
  name: z.string().optional(),
  workspace: z.string().optional(),
  notes: z.string().optional(),
})

export const TaskCreateOutput = z.record(z.string(), z.unknown())

export const taskCreate = pikkuSessionlessFunc({
  description: "Task create",
  input: TaskCreateInput,
  output: TaskCreateOutput,
  func: async ({ asana }, data) => {
    return asana.call("POST", "/tasks", data) as any
  },
})
