import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ReportGetInput = z.object({
  reportId: z.string(),
  tableId: z.string(),
})

export const ReportGetOutput = z.record(z.string(), z.unknown())

export const reportGet = pikkuSessionlessFunc({
  description: "Get a report",
  input: ReportGetInput,
  output: ReportGetOutput,
  func: async ({ quickbase }, data) => {
    return quickbase.call("GET", "/reports/{reportId}", data) as any
  },
})
