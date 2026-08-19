import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ContactCreateInput = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  city: z.string().optional(),
})

export const ContactCreateOutput = z.record(z.string(), z.unknown())

export const contactCreate = pikkuSessionlessFunc({
  description: "Create contact",
  input: ContactCreateInput,
  output: ContactCreateOutput,
  func: async ({ odoo }, data) => {
    return odoo.call("POST", "/jsonrpc/contact/create", data) as any
  },
})
