import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const PortfolioGetAllOutput = z.record(z.string(), z.unknown())

export const portfolioGetAll = pikkuSessionlessFunc({
  description: "Get all portfolios",
  output: PortfolioGetAllOutput,
  func: async ({ securityScorecard }) => {
    return securityScorecard.call("GET", "/portfolios") as any
  },
})
