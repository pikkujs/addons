import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const JobsListInput = z.object({
  depth: z.number().optional().describe('API depth for nested data'),
})

export const JobsListOutput = z.object({
  jobs: z.array(z.object({
    name: z.string().describe('Job name'),
    url: z.string().describe('Job URL'),
    color: z.string().describe('Job status color'),
  })),
})

type Output = z.infer<typeof JobsListOutput>

export const jobsList = pikkuSessionlessFunc({
  description: 'List Jenkins jobs',
  node: { displayName: 'List Jobs', category: 'Jobs', type: 'action' },
  input: JobsListInput,
  output: JobsListOutput,
  func: async ({ jenkins }, data) => {
    return await jenkins.request<Output>('GET', '/api/json', { qs: { depth: data.depth || 1 } })
  },
})
