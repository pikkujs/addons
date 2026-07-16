import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CustomFieldDeleteInput = z.object({
  id: z.string(),
})

export const CustomFieldDeleteOutput = z.record(z.string(), z.unknown())

export const customFieldDelete = pikkuSessionlessFunc({
  description: "CustomFieldDelete",
  input: CustomFieldDeleteInput,
  output: CustomFieldDeleteOutput,
  func: async ({ convertkit }, data) => {
    return convertkit.call("DELETE", "/custom_fields/{id}", data) as any
  },
})
