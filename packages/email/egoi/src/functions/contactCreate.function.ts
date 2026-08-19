import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ContactCreateInput = z.object({
  listId: z.string(),
  email: z.string().optional(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  cellphone: z.string().optional(),
  status: z.string().optional(),
})

export const ContactCreateOutput = z.object({
  contact_id: z.string().optional(),
})

export const contactCreate = pikkuSessionlessFunc({
  description: "Create a contact",
  input: ContactCreateInput,
  output: ContactCreateOutput,
  func: async ({ egoi }, data) => {
    return egoi.call("POST", "/lists/{listId}/contacts", data) as any
  },
})
