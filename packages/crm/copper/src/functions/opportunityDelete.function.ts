import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const OpportunityDeleteInput = z.object({
  opportunityId: z.string(),
})

export const OpportunityDeleteOutput = z.record(z.string(), z.unknown())

export const opportunityDelete = pikkuSessionlessFunc({
  description: "Delete an opportunity",
  input: OpportunityDeleteInput,
  output: OpportunityDeleteOutput,
  func: async ({ copper }, data) => {
    return copper.call("DELETE", "/opportunities/{opportunityId}", data) as any
  },
})
