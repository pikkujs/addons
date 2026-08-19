import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CompanyGetFactorHistoricalInput = z.object({
  scorecardIdentifier: z.string(),
  date_from: z.string().optional(),
  date_to: z.string().optional(),
})

export const CompanyGetFactorHistoricalOutput = z.record(z.string(), z.unknown())

export const companyGetFactorHistorical = pikkuSessionlessFunc({
  description: "Get historical company factor scores",
  input: CompanyGetFactorHistoricalInput,
  output: CompanyGetFactorHistoricalOutput,
  func: async ({ securityScorecard }, data) => {
    return securityScorecard.call("GET", "/companies/{scorecardIdentifier}/history/factors", data) as any
  },
})
