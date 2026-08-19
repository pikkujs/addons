import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CustomCreateInput = z.object({
  customResource: z.string().optional().describe("Odoo model name"),
  fieldsToCreateOrUpdate: z.record(z.string(), z.unknown()).optional(),
})

export const CustomCreateOutput = z.record(z.string(), z.unknown())

export const customCreate = pikkuSessionlessFunc({
  description: "Create custom",
  input: CustomCreateInput,
  output: CustomCreateOutput,
  func: async ({ odoo }, data) => {
    return odoo.call("POST", "/jsonrpc/custom/create", data) as any
  },
})
