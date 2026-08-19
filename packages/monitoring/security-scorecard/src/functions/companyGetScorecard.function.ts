import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CompanyGetScorecardInput = z.object({
  scorecardIdentifier: z.string(),
})

export const CompanyGetScorecardOutput = z.record(z.string(), z.unknown())

export const companyGetScorecard = pikkuSessionlessFunc({
  description: "Get a company scorecard",
  input: CompanyGetScorecardInput,
  output: CompanyGetScorecardOutput,
  func: async ({ securityScorecard }, data) => {
    return securityScorecard.call("GET", "/companies/{scorecardIdentifier}", data) as any
  },
})
