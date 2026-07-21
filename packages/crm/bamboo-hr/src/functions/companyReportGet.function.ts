import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CompanyReportGetInput = z.object({
  reportId: z.string(),
  format: z.string().optional(),
})

export const CompanyReportGetOutput = z.record(z.string(), z.unknown())

export const companyReportGet = pikkuSessionlessFunc({
  description: "Get a company report",
  input: CompanyReportGetInput,
  output: CompanyReportGetOutput,
  func: async ({ bambooHr }, data) => {
    return bambooHr.call("GET", "/reports/{reportId}", data) as any
  },
})
