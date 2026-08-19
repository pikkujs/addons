import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const JobGetInput = z.object({
  jobId: z.string(),
})

export const JobGetOutput = z.object({
  id: z.string().optional(),
  status: z.string().optional(),
  analyzerName: z.string().optional(),
})

export const jobGet = pikkuSessionlessFunc({
  description: "Get details of a job",
  input: JobGetInput,
  output: JobGetOutput,
  func: async ({ cortex }, data) => {
    return cortex.call("GET", "/job/{jobId}", data) as any
  },
})
