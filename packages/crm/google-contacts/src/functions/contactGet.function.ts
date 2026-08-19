import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ContactGetInput = z.object({
  contactId: z.string(),
  personFields: z.string().optional(),
})

export const ContactGetOutput = z.object({
  resourceName: z.string().optional(),
  etag: z.string().optional(),
})

export const contactGet = pikkuSessionlessFunc({
  description: "Get a contact",
  input: ContactGetInput,
  output: ContactGetOutput,
  func: async ({ googleContacts }, data) => {
    return googleContacts.call("GET", "/people/{contactId}", data) as any
  },
})
