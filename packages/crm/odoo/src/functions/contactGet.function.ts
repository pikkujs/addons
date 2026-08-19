import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ContactGetInput = z.object({
  id: z.string().optional().describe("Odoo record ID"),
})

export const ContactGetOutput = z.record(z.string(), z.unknown())

export const contactGet = pikkuSessionlessFunc({
  description: "Get contact",
  input: ContactGetInput,
  output: ContactGetOutput,
  func: async ({ odoo }, data) => {
    return odoo.call("POST", "/jsonrpc/contact/get", data) as any
  },
})
