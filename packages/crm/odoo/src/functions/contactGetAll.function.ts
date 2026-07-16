import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ContactGetAllInput = z.object({
  limit: z.number().int().optional(),
  filter: z.record(z.string(), z.unknown()).optional(),
})

export const ContactGetAllOutput = z.record(z.string(), z.unknown())

export const contactGetAll = pikkuSessionlessFunc({
  description: "GetAll contact",
  input: ContactGetAllInput,
  output: ContactGetAllOutput,
  func: async ({ odoo }, data) => {
    return odoo.call("POST", "/jsonrpc/contact/getAll", data) as any
  },
})
