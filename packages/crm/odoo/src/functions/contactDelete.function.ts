import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ContactDeleteInput = z.object({
  id: z.string().optional().describe("Odoo record ID"),
})

export const ContactDeleteOutput = z.record(z.string(), z.unknown())

export const contactDelete = pikkuSessionlessFunc({
  description: "Delete contact",
  input: ContactDeleteInput,
  output: ContactDeleteOutput,
  func: async ({ odoo }, data) => {
    return odoo.call("POST", "/jsonrpc/contact/delete", data) as any
  },
})
