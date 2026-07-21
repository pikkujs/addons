import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ReportDownloadInput = z.object({
  file: z.string(),
})

export const ReportDownloadOutput = z.record(z.string(), z.unknown())

export const reportDownload = pikkuSessionlessFunc({
  description: "Download a generated report file",
  input: ReportDownloadInput,
  output: ReportDownloadOutput,
  func: async ({ securityScorecard }, data) => {
    return securityScorecard.call("GET", "/reports/files/{file}", data) as any
  },
})
