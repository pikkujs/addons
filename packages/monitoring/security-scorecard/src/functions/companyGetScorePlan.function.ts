import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CompanyGetScorePlanInput = z.object({
  scorecardIdentifier: z.string(),
  score: z.string(),
})

export const CompanyGetScorePlanOutput = z.record(z.string(), z.unknown())

export const companyGetScorePlan = pikkuSessionlessFunc({
  description: "Get a company score plan by target",
  input: CompanyGetScorePlanInput,
  output: CompanyGetScorePlanOutput,
  func: async ({ securityScorecard }, data) => {
    return securityScorecard.call("GET", "/companies/{scorecardIdentifier}/score-plans/by-target/{score}", data) as any
  },
})
