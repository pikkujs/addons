import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const DealUpdateInput = z.object({
  id: z.number().optional(),
  name: z.string().optional(),
  expected_value: z.number().optional(),
  probability: z.number().optional(),
})

export const DealUpdateOutput = z.record(z.string(), z.unknown())

export const dealUpdate = pikkuSessionlessFunc({
  description: "Update a deal",
  input: DealUpdateInput,
  output: DealUpdateOutput,
  func: async ({ agileCrm }, data) => {
    return agileCrm.call("PUT", "/api/opportunity/partial-update", data) as any
  },
})
