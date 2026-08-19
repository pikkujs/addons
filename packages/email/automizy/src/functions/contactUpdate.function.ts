import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ContactUpdateInput = z.object({
  listId: z.string(),
  email: z.string().optional(),
  status: z.string().optional(),
  customFields: z.record(z.string(), z.unknown()).optional(),
})

export const ContactUpdateOutput = z.record(z.string(), z.unknown())

export const contactUpdate = pikkuSessionlessFunc({
  description: "Update a contact in a list",
  input: ContactUpdateInput,
  output: ContactUpdateOutput,
  func: async ({ automizy }, data) => {
    return automizy.call("PATCH", "/smart-lists/{listId}/contacts", data) as any
  },
})
