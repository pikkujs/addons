import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const FieldGetAllInput = z.object({
  tableId: z.string(),
})

export const FieldGetAllOutput = z.record(z.string(), z.unknown())

export const fieldGetAll = pikkuSessionlessFunc({
  description: "Get all fields for a table",
  input: FieldGetAllInput,
  output: FieldGetAllOutput,
  func: async ({ quickbase }, data) => {
    return quickbase.call("GET", "/fields", data) as any
  },
})
