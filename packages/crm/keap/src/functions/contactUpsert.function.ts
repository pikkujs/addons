import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ContactUpsertInput = z.object({
  duplicate_option: z.string().optional(),
  given_name: z.string().optional(),
  family_name: z.string().optional(),
})

export const ContactUpsertOutput = z.record(z.string(), z.unknown())

export const contactUpsert = pikkuSessionlessFunc({
  description: "Create or update a contact",
  input: ContactUpsertInput,
  output: ContactUpsertOutput,
  func: async ({ keap }, data) => {
    return keap.call("PUT", "/contacts", data) as any
  },
})
