import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const DealCreateInput = z.object({
  name: z.string().optional(),
  close_date: z.number().optional(),
  expected_value: z.number().optional(),
  milestone: z.string().optional(),
  probability: z.number().optional(),
})

export const DealCreateOutput = z.record(z.string(), z.unknown())

export const dealCreate = pikkuSessionlessFunc({
  description: "Create a deal",
  input: DealCreateInput,
  output: DealCreateOutput,
  func: async ({ agileCrm }, data) => {
    return agileCrm.call("POST", "/api/opportunity", data) as any
  },
})
