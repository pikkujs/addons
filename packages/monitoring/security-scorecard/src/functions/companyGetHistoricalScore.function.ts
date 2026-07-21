import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CompanyGetHistoricalScoreInput = z.object({
  scorecardIdentifier: z.string(),
  from: z.string().optional(),
  to: z.string().optional(),
})

export const CompanyGetHistoricalScoreOutput = z.record(z.string(), z.unknown())

export const companyGetHistoricalScore = pikkuSessionlessFunc({
  description: "Get historical company score",
  input: CompanyGetHistoricalScoreInput,
  output: CompanyGetHistoricalScoreOutput,
  func: async ({ securityScorecard }, data) => {
    return securityScorecard.call("GET", "/companies/{scorecardIdentifier}/history/score", data) as any
  },
})
