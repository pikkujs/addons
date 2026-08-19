import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CustomDeleteInput = z.object({
  id: z.string().optional().describe("Odoo record ID"),
})

export const CustomDeleteOutput = z.record(z.string(), z.unknown())

export const customDelete = pikkuSessionlessFunc({
  description: "Delete custom",
  input: CustomDeleteInput,
  output: CustomDeleteOutput,
  func: async ({ odoo }, data) => {
    return odoo.call("POST", "/jsonrpc/custom/delete", data) as any
  },
})
