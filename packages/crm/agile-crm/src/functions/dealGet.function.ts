import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const DealGetInput = z.object({
  dealId: z.string(),
})

export const DealGetOutput = z.record(z.string(), z.unknown())

export const dealGet = pikkuSessionlessFunc({
  description: "Get a deal",
  input: DealGetInput,
  output: DealGetOutput,
  func: async ({ agileCrm }, data) => {
    return agileCrm.call("GET", "/api/opportunity/{dealId}", data) as any
  },
})
