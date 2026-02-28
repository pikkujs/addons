import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const PipelinesTriggerInput = z.object({
  projectSlug: z.string().describe('Project slug (e.g., gh/owner/repo)'),
  branch: z.string().optional().describe('Branch to run pipeline on'),
  tag: z.string().optional().describe('Tag to run pipeline on'),
  parameters: z.record(z.string(), z.unknown()).optional().describe('Pipeline parameters'),
})

export const PipelinesTriggerOutput = z.object({
  id: z.string().describe('Pipeline ID'),
  number: z.number().describe('Pipeline number'),
  state: z.string().describe('Pipeline state'),
  created_at: z.string().describe('Creation timestamp'),
})

type Output = z.infer<typeof PipelinesTriggerOutput>

export const pipelinesTrigger = pikkuSessionlessFunc({
  description: 'Trigger a new pipeline',
  node: { displayName: 'Trigger Pipeline', category: 'Pipelines', type: 'action' },
  input: PipelinesTriggerInput,
  output: PipelinesTriggerOutput,
  func: async ({ circleci }, data) => {
    const { projectSlug, ...body } = data
    return await circleci.request<Output>('POST', `/project/${projectSlug}/pipeline`, { body })
  },
})
