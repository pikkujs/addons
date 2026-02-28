import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const BuildsGetInput = z.object({
  jobName: z.string().describe('Job name'),
  buildNumber: z.number().describe('Build number'),
})

export const BuildsGetOutput = z.object({
  number: z.number().describe('Build number'),
  result: z.string().nullable().describe('Build result'),
  building: z.boolean().describe('Is currently building'),
  duration: z.number().describe('Build duration in ms'),
  url: z.string().describe('Build URL'),
  timestamp: z.number().describe('Build timestamp'),
})

type Output = z.infer<typeof BuildsGetOutput>

export const buildsGet = pikkuSessionlessFunc({
  description: 'Get Jenkins build information',
  node: { displayName: 'Get Build', category: 'Builds', type: 'action' },
  input: BuildsGetInput,
  output: BuildsGetOutput,
  func: async ({ jenkins }, data) => {
    return await jenkins.request<Output>(
      'GET',
      `/job/${encodeURIComponent(data.jobName)}/${data.buildNumber}/api/json`
    )
  },
})
