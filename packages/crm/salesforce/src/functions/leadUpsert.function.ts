import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const LeadUpsertInput = z.object({
  externalIdField: z.string(),
  externalIdValue: z.string(),
  value: z.string().optional(),
})

export const LeadUpsertOutput = z.record(z.string(), z.unknown())

export const leadUpsert = pikkuSessionlessFunc({
  description: "Create or update Lead",
  input: LeadUpsertInput,
  output: LeadUpsertOutput,
  func: async ({ salesforce }, data) => {
    return salesforce.call("PATCH", "/sobjects/Lead/{externalIdField}/{externalIdValue}", data) as any
  },
})
