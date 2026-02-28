import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const PipelinesGetInput = z.object({
  pipelineId: z.string().describe('Pipeline ID'),
})

export const PipelinesGetOutput = z.object({
  id: z.string().describe('Pipeline ID'),
  number: z.number().describe('Pipeline number'),
  state: z.string().describe('Pipeline state'),
  created_at: z.string().describe('Creation timestamp'),
  project_slug: z.string().describe('Project slug'),
})

type Output = z.infer<typeof PipelinesGetOutput>

export const pipelinesGet = pikkuSessionlessFunc({
  description: 'Get a specific pipeline',
  node: { displayName: 'Get Pipeline', category: 'Pipelines', type: 'action' },
  input: PipelinesGetInput,
  output: PipelinesGetOutput,
  func: async ({ circleci }, data) => {
    return await circleci.request<Output>('GET', `/pipeline/${data.pipelineId}`)
  },
})
