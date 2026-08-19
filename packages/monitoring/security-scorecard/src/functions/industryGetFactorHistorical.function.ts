import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const IndustryGetFactorHistoricalInput = z.object({
  industry: z.string(),
  from: z.string().optional(),
  to: z.string().optional(),
})

export const IndustryGetFactorHistoricalOutput = z.record(z.string(), z.unknown())

export const industryGetFactorHistorical = pikkuSessionlessFunc({
  description: "Get historical industry factor scores",
  input: IndustryGetFactorHistoricalInput,
  output: IndustryGetFactorHistoricalOutput,
  func: async ({ securityScorecard }, data) => {
    return securityScorecard.call("GET", "/industries/{industry}/history/factors/historical", data) as any
  },
})
