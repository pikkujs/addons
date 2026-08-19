import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ReportRunInput = z.object({
  reportId: z.string(),
  tableId: z.string(),
})

export const ReportRunOutput = z.record(z.string(), z.unknown())

export const reportRun = pikkuSessionlessFunc({
  description: "Run a report",
  input: ReportRunInput,
  output: ReportRunOutput,
  func: async ({ quickbase }, data) => {
    return quickbase.call("POST", "/reports/{reportId}/run", data) as any
  },
})
