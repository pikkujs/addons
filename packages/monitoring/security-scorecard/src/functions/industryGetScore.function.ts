import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const IndustryGetScoreInput = z.object({
  industry: z.string(),
})

export const IndustryGetScoreOutput = z.record(z.string(), z.unknown())

export const industryGetScore = pikkuSessionlessFunc({
  description: "Get an industry score",
  input: IndustryGetScoreInput,
  output: IndustryGetScoreOutput,
  func: async ({ securityScorecard }, data) => {
    return securityScorecard.call("GET", "/industries/{industry}/score", data) as any
  },
})
