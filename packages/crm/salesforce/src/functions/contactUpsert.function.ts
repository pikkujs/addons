import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ContactUpsertInput = z.object({
  externalIdField: z.string(),
  externalIdValue: z.string(),
  value: z.string().optional(),
})

export const ContactUpsertOutput = z.record(z.string(), z.unknown())

export const contactUpsert = pikkuSessionlessFunc({
  description: "Create or update Contact",
  input: ContactUpsertInput,
  output: ContactUpsertOutput,
  func: async ({ salesforce }, data) => {
    return salesforce.call("PATCH", "/sobjects/Contact/{externalIdField}/{externalIdValue}", data) as any
  },
})
