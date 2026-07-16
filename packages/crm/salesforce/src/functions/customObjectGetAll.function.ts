import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CustomObjectGetAllInput = z.object({
  q: z.string().optional(),
  limit: z.number().int().optional(),
})

export const CustomObjectGetAllOutput = z.object({
  totalSize: z.number().int().optional(),
  done: z.boolean().optional(),
})

export const customObjectGetAll = pikkuSessionlessFunc({
  description: "Get many CustomObject",
  input: CustomObjectGetAllInput,
  output: CustomObjectGetAllOutput,
  func: async ({ salesforce }, data) => {
    return salesforce.call("GET", "/query/CustomObject", data) as any
  },
})
