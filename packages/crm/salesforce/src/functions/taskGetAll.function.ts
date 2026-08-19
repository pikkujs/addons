import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const TaskGetAllInput = z.object({
  q: z.string().optional(),
  limit: z.number().int().optional(),
})

export const TaskGetAllOutput = z.object({
  totalSize: z.number().int().optional(),
  done: z.boolean().optional(),
})

export const taskGetAll = pikkuSessionlessFunc({
  description: "Get many Task",
  input: TaskGetAllInput,
  output: TaskGetAllOutput,
  func: async ({ salesforce }, data) => {
    return salesforce.call("GET", "/query/Task", data) as any
  },
})
