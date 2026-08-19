import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CustomObjectUpdateInput = z.object({
  id: z.string(),
  customObject: z.string().optional(),
})

export const CustomObjectUpdateOutput = z.record(z.string(), z.unknown())

export const customObjectUpdate = pikkuSessionlessFunc({
  description: "Update CustomObject",
  input: CustomObjectUpdateInput,
  output: CustomObjectUpdateOutput,
  func: async ({ salesforce }, data) => {
    return salesforce.call("PATCH", "/sobjects/CustomObject/{id}", data) as any
  },
})
