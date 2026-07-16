import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CustomGetInput = z.object({
  id: z.string().optional().describe("Odoo record ID"),
})

export const CustomGetOutput = z.record(z.string(), z.unknown())

export const customGet = pikkuSessionlessFunc({
  description: "Get custom",
  input: CustomGetInput,
  output: CustomGetOutput,
  func: async ({ odoo }, data) => {
    return odoo.call("POST", "/jsonrpc/custom/get", data) as any
  },
})
