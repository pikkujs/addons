import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ContactGetAllInput = z.object({
  personFields: z.string().optional(),
  pageSize: z.number().int().optional(),
  pageToken: z.string().optional(),
})

export const ContactGetAllOutput = z.object({
  connections: z.array(z.record(z.string(), z.unknown())).optional(),
  nextPageToken: z.string().optional(),
})

export const contactGetAll = pikkuSessionlessFunc({
  description: "Get many contacts",
  input: ContactGetAllInput,
  output: ContactGetAllOutput,
  func: async ({ googleContacts }, data) => {
    return googleContacts.call("GET", "/people/me/connections", data) as any
  },
})
