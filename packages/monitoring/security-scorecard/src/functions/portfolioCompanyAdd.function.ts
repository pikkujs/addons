import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const PortfolioCompanyAddInput = z.object({
  portfolioId: z.string(),
  domain: z.string(),
})

export const PortfolioCompanyAddOutput = z.record(z.string(), z.unknown())

export const portfolioCompanyAdd = pikkuSessionlessFunc({
  description: "Add a company to a portfolio",
  input: PortfolioCompanyAddInput,
  output: PortfolioCompanyAddOutput,
  func: async ({ securityScorecard }, data) => {
    return securityScorecard.call("PUT", "/portfolios/{portfolioId}/companies/{domain}", data) as any
  },
})
