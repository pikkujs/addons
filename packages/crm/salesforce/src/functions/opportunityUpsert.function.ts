import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const OpportunityUpsertInput = z.object({
  externalIdField: z.string(),
  externalIdValue: z.string(),
  value: z.string().optional(),
})

export const OpportunityUpsertOutput = z.record(z.string(), z.unknown())

export const opportunityUpsert = pikkuSessionlessFunc({
  description: "Create or update Opportunity",
  input: OpportunityUpsertInput,
  output: OpportunityUpsertOutput,
  func: async ({ salesforce }, data) => {
    return salesforce.call("PATCH", "/sobjects/Opportunity/{externalIdField}/{externalIdValue}", data) as any
  },
})
