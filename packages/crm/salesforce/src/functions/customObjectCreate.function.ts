import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CustomObjectCreateInput = z.object({
  customObject: z.string().optional(),
})

export const CustomObjectCreateOutput = z.object({
  id: z.string().optional(),
  success: z.boolean().optional(),
})

export const customObjectCreate = pikkuSessionlessFunc({
  description: "Create CustomObject",
  input: CustomObjectCreateInput,
  output: CustomObjectCreateOutput,
  func: async ({ salesforce }, data) => {
    return salesforce.call("POST", "/sobjects/CustomObject", data) as any
  },
})
