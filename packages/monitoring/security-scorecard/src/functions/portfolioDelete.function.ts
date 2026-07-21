import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const PortfolioDeleteInput = z.object({
  portfolioId: z.string(),
})

export const PortfolioDeleteOutput = z.record(z.string(), z.unknown())

export const portfolioDelete = pikkuSessionlessFunc({
  description: "Delete a portfolio",
  input: PortfolioDeleteInput,
  output: PortfolioDeleteOutput,
  func: async ({ securityScorecard }, data) => {
    return securityScorecard.call("DELETE", "/portfolios/{portfolioId}", data) as any
  },
})
