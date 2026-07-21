import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ContactUpdateInput = z.object({
  contactId: z.string(),
  updatePersonFields: z.string().optional(),
  etag: z.string().optional(),
  names: z.array(z.object({
  givenName: z.string().optional(),
  familyName: z.string().optional(),
})).optional(),
})

export const ContactUpdateOutput = z.object({
  resourceName: z.string().optional(),
  etag: z.string().optional(),
})

export const contactUpdate = pikkuSessionlessFunc({
  description: "Update a contact",
  input: ContactUpdateInput,
  output: ContactUpdateOutput,
  func: async ({ googleContacts }, data) => {
    return googleContacts.call("PATCH", "/people/{contactId}:updateContact", data) as any
  },
})
