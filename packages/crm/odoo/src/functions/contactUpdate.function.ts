import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ContactUpdateInput = z.object({
  id: z.string().optional().describe("Odoo record ID"),
  name: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  city: z.string().optional(),
})

export const ContactUpdateOutput = z.record(z.string(), z.unknown())

export const contactUpdate = pikkuSessionlessFunc({
  description: "Update contact",
  input: ContactUpdateInput,
  output: ContactUpdateOutput,
  func: async ({ odoo }, data) => {
    return odoo.call("POST", "/jsonrpc/contact/update", data) as any
  },
})
