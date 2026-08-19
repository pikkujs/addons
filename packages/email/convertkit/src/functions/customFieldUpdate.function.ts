import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CustomFieldUpdateInput = z.object({
  id: z.string(),
  label: z.string().optional(),
})

export const CustomFieldUpdateOutput = z.record(z.string(), z.unknown())

export const customFieldUpdate = pikkuSessionlessFunc({
  description: "CustomFieldUpdate",
  input: CustomFieldUpdateInput,
  output: CustomFieldUpdateOutput,
  func: async ({ convertkit }, data) => {
    return convertkit.call("PUT", "/custom_fields/{id}", data) as any
  },
})
