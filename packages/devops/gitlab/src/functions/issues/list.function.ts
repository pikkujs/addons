import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const IssuesListInput = z.object({
  projectId: z.string().describe('Project ID or URL-encoded path'),
  state: z.enum(['opened', 'closed', 'all']).optional().describe('Issue state'),
  labels: z.string().optional().describe('Comma-separated list of label names'),
  per_page: z.number().optional().describe('Results per page (max 100)'),
})

export const IssuesListOutput = z.array(z.object({
  id: z.number().describe('Issue ID'),
  iid: z.number().describe('Internal issue ID'),
  title: z.string().describe('Issue title'),
  state: z.string().describe('Issue state'),
  web_url: z.string().describe('Issue URL'),
  description: z.string().nullable().describe('Issue description'),
}))

type Output = z.infer<typeof IssuesListOutput>

export const issuesList = pikkuSessionlessFunc({
  description: 'List issues in a GitLab project',
  node: { displayName: 'List Issues', category: 'Issues', type: 'action' },
  input: IssuesListInput,
  output: IssuesListOutput,
  func: async ({ gitlab }, data) => {
    const { projectId, ...qs } = data
    const encodedProjectId = encodeURIComponent(projectId)
    return await gitlab.request<Output>('GET', `/projects/${encodedProjectId}/issues`, { qs })
  },
})
