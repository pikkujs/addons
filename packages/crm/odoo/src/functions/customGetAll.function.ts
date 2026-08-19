import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CustomGetAllInput = z.object({
  limit: z.number().int().optional(),
  filter: z.record(z.string(), z.unknown()).optional(),
})

export const CustomGetAllOutput = z.record(z.string(), z.unknown())

export const customGetAll = pikkuSessionlessFunc({
  description: "GetAll custom",
  input: CustomGetAllInput,
  output: CustomGetAllOutput,
  func: async ({ odoo }, data) => {
    return odoo.call("POST", "/jsonrpc/custom/getAll", data) as any
  },
})
