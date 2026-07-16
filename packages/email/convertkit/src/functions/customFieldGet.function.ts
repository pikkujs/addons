import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CustomFieldGetInput = z.object({
  id: z.string(),
})

export const CustomFieldGetOutput = z.record(z.string(), z.unknown())

export const customFieldGet = pikkuSessionlessFunc({
  description: "CustomFieldGet",
  input: CustomFieldGetInput,
  output: CustomFieldGetOutput,
  func: async ({ convertkit }, data) => {
    return convertkit.call("GET", "/custom_fields/{id}", data) as any
  },
})
