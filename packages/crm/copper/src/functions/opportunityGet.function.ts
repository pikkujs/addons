import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const OpportunityGetInput = z.object({
  opportunityId: z.string(),
})

export const OpportunityGetOutput = z.record(z.string(), z.unknown())

export const opportunityGet = pikkuSessionlessFunc({
  description: "Get an opportunity",
  input: OpportunityGetInput,
  output: OpportunityGetOutput,
  func: async ({ copper }, data) => {
    return copper.call("GET", "/opportunities/{opportunityId}", data) as any
  },
})
