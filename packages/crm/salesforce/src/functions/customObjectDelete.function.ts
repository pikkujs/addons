import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CustomObjectDeleteInput = z.object({
  id: z.string(),
})

export const CustomObjectDeleteOutput = z.record(z.string(), z.unknown())

export const customObjectDelete = pikkuSessionlessFunc({
  description: "Delete CustomObject",
  input: CustomObjectDeleteInput,
  output: CustomObjectDeleteOutput,
  func: async ({ salesforce }, data) => {
    return salesforce.call("DELETE", "/sobjects/CustomObject/{id}", data) as any
  },
})
