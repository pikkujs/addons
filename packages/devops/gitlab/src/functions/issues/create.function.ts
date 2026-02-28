import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const IssuesCreateInput = z.object({
  projectId: z.string().describe('Project ID or URL-encoded path'),
  title: z.string().describe('Issue title'),
  description: z.string().optional().describe('Issue description'),
  labels: z.string().optional().describe('Comma-separated list of label names'),
  assignee_ids: z.array(z.number()).optional().describe('Assignee user IDs'),
})

export const IssuesCreateOutput = z.object({
  id: z.number().describe('Issue ID'),
  iid: z.number().describe('Internal issue ID'),
  title: z.string().describe('Issue title'),
  state: z.string().describe('Issue state'),
  web_url: z.string().describe('Issue URL'),
  description: z.string().nullable().describe('Issue description'),
})

type Output = z.infer<typeof IssuesCreateOutput>

export const issuesCreate = pikkuSessionlessFunc({
  description: 'Create a new issue in a GitLab project',
  node: { displayName: 'Create Issue', category: 'Issues', type: 'action' },
  input: IssuesCreateInput,
  output: IssuesCreateOutput,
  func: async ({ gitlab }, data) => {
    const { projectId, ...body } = data
    const encodedProjectId = encodeURIComponent(projectId)
    return await gitlab.request<Output>('POST', `/projects/${encodedProjectId}/issues`, { body })
  },
})
