import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const PortfolioCompanyGetAllInput = z.object({
  portfolioId: z.string(),
})

export const PortfolioCompanyGetAllOutput = z.record(z.string(), z.unknown())

export const portfolioCompanyGetAll = pikkuSessionlessFunc({
  description: "Get all companies in a portfolio",
  input: PortfolioCompanyGetAllInput,
  output: PortfolioCompanyGetAllOutput,
  func: async ({ securityScorecard }, data) => {
    return securityScorecard.call("GET", "/portfolios/{portfolioId}/companies", data) as any
  },
})
