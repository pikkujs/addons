import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const DealDeleteInput = z.object({
  dealId: z.string(),
})

export const DealDeleteOutput = z.record(z.string(), z.unknown())

export const dealDelete = pikkuSessionlessFunc({
  description: "Delete a deal",
  input: DealDeleteInput,
  output: DealDeleteOutput,
  func: async ({ agileCrm }, data) => {
    return agileCrm.call("DELETE", "/api/opportunity/{dealId}", data) as any
  },
})
