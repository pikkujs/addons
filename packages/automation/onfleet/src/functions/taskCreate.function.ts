import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TaskCreateInput = z.object({
  destination: z.string().optional(),
  recipients: z.array(z.string()).optional(),
})

export const TaskCreateOutput = z.record(z.string(), z.unknown())

export const taskCreate = pikkuSessionlessFunc({
  description: "Create a task",
  input: TaskCreateInput,
  output: TaskCreateOutput,
  func: async ({ onfleet }, data) => {
    return onfleet.call("POST", "/tasks", data) as any
  },
})
