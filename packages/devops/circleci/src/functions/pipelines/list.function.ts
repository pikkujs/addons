import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const PipelinesListInput = z.object({
  projectSlug: z.string().describe('Project slug (e.g., gh/owner/repo)'),
  branch: z.string().optional().describe('Filter by branch name'),
  pageToken: z.string().optional().describe('Page token for pagination'),
})

export const PipelinesListOutput = z.object({
  items: z.array(z.object({
    id: z.string().describe('Pipeline ID'),
    number: z.number().describe('Pipeline number'),
    state: z.string().describe('Pipeline state'),
    created_at: z.string().describe('Creation timestamp'),
  })),
  next_page_token: z.string().nullable().describe('Next page token'),
})

type Output = z.infer<typeof PipelinesListOutput>

export const pipelinesList = pikkuSessionlessFunc({
  description: 'List pipelines for a project',
  node: { displayName: 'List Pipelines', category: 'Pipelines', type: 'action' },
  input: PipelinesListInput,
  output: PipelinesListOutput,
  func: async ({ circleci }, data) => {
    const { projectSlug, ...qs } = data
    return await circleci.request<Output>('GET', `/project/${projectSlug}/pipeline`, { qs })
  },
})
