import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CustomFieldCreateInput = z.object({
  label: z.string().optional(),
})

export const CustomFieldCreateOutput = z.record(z.string(), z.unknown())

export const customFieldCreate = pikkuSessionlessFunc({
  description: "CustomFieldCreate",
  input: CustomFieldCreateInput,
  output: CustomFieldCreateOutput,
  func: async ({ convertkit }, data) => {
    return convertkit.call("POST", "/custom_fields", data) as any
  },
})
