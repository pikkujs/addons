import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CompanyGetFactorInput = z.object({
  scorecardIdentifier: z.string(),
})

export const CompanyGetFactorOutput = z.record(z.string(), z.unknown())

export const companyGetFactor = pikkuSessionlessFunc({
  description: "Get company factor scores",
  input: CompanyGetFactorInput,
  output: CompanyGetFactorOutput,
  func: async ({ securityScorecard }, data) => {
    return securityScorecard.call("GET", "/companies/{scorecardIdentifier}/factors", data) as any
  },
})
