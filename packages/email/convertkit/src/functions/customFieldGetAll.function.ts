import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CustomFieldGetAllOutput = z.record(z.string(), z.unknown())

export const customFieldGetAll = pikkuSessionlessFunc({
  description: "CustomFieldGetAll",
  output: CustomFieldGetAllOutput,
  func: async ({ convertkit }) => {
    return convertkit.call("GET", "/custom_fields") as any
  },
})
