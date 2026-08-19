import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const TaskCreateInput = z.object({
  project: z.string().optional(),
  subject: z.string().optional(),
})

export const TaskCreateOutput = z.record(z.string(), z.unknown())

export const taskCreate = pikkuSessionlessFunc({
  description: "TaskCreate",
  input: TaskCreateInput,
  output: TaskCreateOutput,
  func: async ({ taiga }, data) => {
    return taiga.call("POST", "/tasks", data) as any
  },
})
