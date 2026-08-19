import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ReportGenerateInput = z.object({
  reportType: z.string(),
  scorecard_identifier: z.string().optional(),
  portfolio_id: z.string().optional(),
  format: z.string().optional(),
})

export const ReportGenerateOutput = z.record(z.string(), z.unknown())

export const reportGenerate = pikkuSessionlessFunc({
  description: "Generate a report",
  input: ReportGenerateInput,
  output: ReportGenerateOutput,
  func: async ({ securityScorecard }, data) => {
    return securityScorecard.call("POST", "/reports/{reportType}", data) as any
  },
})
