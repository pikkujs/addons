import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ContactGetInput = z.object({
  listId: z.string(),
  contactId: z.string(),
})

export const ContactGetOutput = z.object({
  contact_id: z.string().optional(),
})

export const contactGet = pikkuSessionlessFunc({
  description: "Get a contact",
  input: ContactGetInput,
  output: ContactGetOutput,
  func: async ({ egoi }, data) => {
    return egoi.call("GET", "/lists/{listId}/contacts/{contactId}", data) as any
  },
})
