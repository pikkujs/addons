import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ReportGetAllOutput = z.record(z.string(), z.unknown())

export const reportGetAll = pikkuSessionlessFunc({
  description: "Get recent reports",
  output: ReportGetAllOutput,
  func: async ({ securityScorecard }) => {
    return securityScorecard.call("GET", "/reports/recent") as any
  },
})
