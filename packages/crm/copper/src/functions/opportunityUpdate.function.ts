import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const OpportunityUpdateInput = z.object({
  opportunityId: z.string(),
  name: z.string().optional(),
  status: z.string().optional(),
  details: z.string().optional(),
})

export const OpportunityUpdateOutput = z.record(z.string(), z.unknown())

export const opportunityUpdate = pikkuSessionlessFunc({
  description: "Update an opportunity",
  input: OpportunityUpdateInput,
  output: OpportunityUpdateOutput,
  func: async ({ copper }, data) => {
    return copper.call("PUT", "/opportunities/{opportunityId}", data) as any
  },
})
