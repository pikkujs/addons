import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ContactUpdateInput = z.object({
  listId: z.string(),
  contactId: z.string(),
  email: z.string().optional(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  cellphone: z.string().optional(),
  status: z.string().optional(),
})

export const ContactUpdateOutput = z.object({
  contact_id: z.string().optional(),
})

export const contactUpdate = pikkuSessionlessFunc({
  description: "Update a contact",
  input: ContactUpdateInput,
  output: ContactUpdateOutput,
  func: async ({ egoi }, data) => {
    return egoi.call("PATCH", "/lists/{listId}/contacts/{contactId}", data) as any
  },
})
