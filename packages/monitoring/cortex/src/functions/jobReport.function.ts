import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const JobReportInput = z.object({
  jobId: z.string(),
})

export const JobReportOutput = z.object({
  id: z.string().optional(),
  status: z.string().optional(),
})

export const jobReport = pikkuSessionlessFunc({
  description: "Get details and report of a job",
  input: JobReportInput,
  output: JobReportOutput,
  func: async ({ cortex }, data) => {
    return cortex.call("GET", "/job/{jobId}/report", data) as any
  },
})
