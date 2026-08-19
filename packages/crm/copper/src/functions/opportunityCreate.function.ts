import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const OpportunityCreateInput = z.object({
  name: z.string().optional(),
  customer_source_id: z.string().optional(),
  primary_contact_id: z.string().optional(),
})

export const OpportunityCreateOutput = z.record(z.string(), z.unknown())

export const opportunityCreate = pikkuSessionlessFunc({
  description: "Create an opportunity",
  input: OpportunityCreateInput,
  output: OpportunityCreateOutput,
  func: async ({ copper }, data) => {
    return copper.call("POST", "/opportunities", data) as any
  },
})
