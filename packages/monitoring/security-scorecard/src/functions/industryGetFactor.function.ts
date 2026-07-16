import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const IndustryGetFactorInput = z.object({
  industry: z.string(),
})

export const IndustryGetFactorOutput = z.record(z.string(), z.unknown())

export const industryGetFactor = pikkuSessionlessFunc({
  description: "Get industry factor scores",
  input: IndustryGetFactorInput,
  output: IndustryGetFactorOutput,
  func: async ({ securityScorecard }, data) => {
    return securityScorecard.call("GET", "/industries/{industry}/history/factors", data) as any
  },
})
