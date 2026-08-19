import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CustomUpdateInput = z.object({
  id: z.string().optional().describe("Odoo record ID"),
  customResource: z.string().optional().describe("Odoo model name"),
  fieldsToCreateOrUpdate: z.record(z.string(), z.unknown()).optional(),
})

export const CustomUpdateOutput = z.record(z.string(), z.unknown())

export const customUpdate = pikkuSessionlessFunc({
  description: "Update custom",
  input: CustomUpdateInput,
  output: CustomUpdateOutput,
  func: async ({ odoo }, data) => {
    return odoo.call("POST", "/jsonrpc/custom/update", data) as any
  },
})
