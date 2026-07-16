import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ContactCreateInput = z.object({
  listId: z.string(),
  email: z.string().optional(),
  status: z.string().optional(),
  customFields: z.record(z.string(), z.unknown()).optional(),
})

export const ContactCreateOutput = z.record(z.string(), z.unknown())

export const contactCreate = pikkuSessionlessFunc({
  description: "Create a contact in a list",
  input: ContactCreateInput,
  output: ContactCreateOutput,
  func: async ({ automizy }, data) => {
    return automizy.call("POST", "/smart-lists/{listId}/contacts", data) as any
  },
})
