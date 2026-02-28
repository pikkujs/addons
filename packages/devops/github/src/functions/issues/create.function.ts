import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const IssuesCreateInput = z.object({
  owner: z.string().describe('Repository owner'),
  repo: z.string().describe('Repository name'),
  title: z.string().describe('Issue title'),
  body: z.string().optional().describe('Issue body'),
  labels: z.array(z.string()).optional().describe('Labels to add'),
  assignees: z.array(z.string()).optional().describe('Usernames to assign'),
})

export const IssuesCreateOutput = z.object({
  id: z.number().describe('Issue ID'),
  number: z.number().describe('Issue number'),
  title: z.string().describe('Issue title'),
  state: z.string().describe('Issue state'),
  html_url: z.string().describe('Issue URL'),
  body: z.string().nullable().describe('Issue body'),
})

type Output = z.infer<typeof IssuesCreateOutput>

export const issuesCreate = pikkuSessionlessFunc({
  description: 'Create a new issue in a repository',
  node: { displayName: 'Create Issue', category: 'Issues', type: 'action' },
  input: IssuesCreateInput,
  output: IssuesCreateOutput,
  func: async ({ github }, data) => {
    const { owner, repo, ...body } = data
    return await github.request<Output>('POST', `/repos/${owner}/${repo}/issues`, { body })
  },
})
