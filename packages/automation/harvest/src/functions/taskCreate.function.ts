import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const TaskCreateInput = z.object({
  name: z.string().optional(),
})

export const TaskCreateOutput = z.record(z.string(), z.unknown())

export const taskCreate = pikkuSessionlessFunc({
  description: "Task create",
  input: TaskCreateInput,
  output: TaskCreateOutput,
  func: async ({ harvest }, data) => {
    return harvest.call("POST", "/tasks", data) as any
  },
})
