import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const PortfolioCreateInput = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  privacy: z.string().optional(),
})

export const PortfolioCreateOutput = z.record(z.string(), z.unknown())

export const portfolioCreate = pikkuSessionlessFunc({
  description: "Create a portfolio",
  input: PortfolioCreateInput,
  output: PortfolioCreateOutput,
  func: async ({ securityScorecard }, data) => {
    return securityScorecard.call("POST", "/portfolios", data) as any
  },
})
