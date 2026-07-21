import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ContactCreateInput = z.object({
  names: z.array(z.object({
  givenName: z.string().optional(),
  familyName: z.string().optional(),
  middleName: z.string().optional(),
})).optional(),
  emailAddresses: z.array(z.object({
  value: z.string().optional(),
  type: z.string().optional(),
})).optional(),
  phoneNumbers: z.array(z.object({
  value: z.string().optional(),
  type: z.string().optional(),
})).optional(),
})

export const ContactCreateOutput = z.object({
  resourceName: z.string().optional(),
  etag: z.string().optional(),
})

export const contactCreate = pikkuSessionlessFunc({
  description: "Create a contact",
  input: ContactCreateInput,
  output: ContactCreateOutput,
  func: async ({ googleContacts }, data) => {
    return googleContacts.call("POST", "/people:createContact", data) as any
  },
})
