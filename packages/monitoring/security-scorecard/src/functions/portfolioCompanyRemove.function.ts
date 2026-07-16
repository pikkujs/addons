import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const PortfolioCompanyRemoveInput = z.object({
  portfolioId: z.string(),
  domain: z.string(),
})

export const PortfolioCompanyRemoveOutput = z.record(z.string(), z.unknown())

export const portfolioCompanyRemove = pikkuSessionlessFunc({
  description: "Remove a company from a portfolio",
  input: PortfolioCompanyRemoveInput,
  output: PortfolioCompanyRemoveOutput,
  func: async ({ securityScorecard }, data) => {
    return securityScorecard.call("DELETE", "/portfolios/{portfolioId}/companies/{domain}", data) as any
  },
})
