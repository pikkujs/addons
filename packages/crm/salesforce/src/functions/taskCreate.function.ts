import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const TaskCreateInput = z.object({
  status: z.string().optional(),
})

export const TaskCreateOutput = z.object({
  id: z.string().optional(),
  success: z.boolean().optional(),
})

export const taskCreate = pikkuSessionlessFunc({
  description: "Create Task",
  input: TaskCreateInput,
  output: TaskCreateOutput,
  func: async ({ salesforce }, data) => {
    return salesforce.call("POST", "/sobjects/Task", data) as any
  },
})
