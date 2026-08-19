import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const PortfolioUpdateInput = z.object({
  portfolioId: z.string(),
  name: z.string().optional(),
  description: z.string().optional(),
  privacy: z.string().optional(),
})

export const PortfolioUpdateOutput = z.record(z.string(), z.unknown())

export const portfolioUpdate = pikkuSessionlessFunc({
  description: "Update a portfolio",
  input: PortfolioUpdateInput,
  output: PortfolioUpdateOutput,
  func: async ({ securityScorecard }, data) => {
    return securityScorecard.call("PUT", "/portfolios/{portfolioId}", data) as any
  },
})
