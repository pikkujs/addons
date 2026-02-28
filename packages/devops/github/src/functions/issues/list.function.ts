import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const IssuesListInput = z.object({
  owner: z.string().describe('Repository owner'),
  repo: z.string().describe('Repository name'),
  state: z.enum(['open', 'closed', 'all']).optional().describe('Issue state'),
  sort: z.enum(['created', 'updated', 'comments']).optional().describe('Sort field'),
  per_page: z.number().optional().describe('Results per page (max 100)'),
})

export const IssuesListOutput = z.array(z.object({
  id: z.number().describe('Issue ID'),
  number: z.number().describe('Issue number'),
  title: z.string().describe('Issue title'),
  state: z.string().describe('Issue state'),
  html_url: z.string().describe('Issue URL'),
  body: z.string().nullable().describe('Issue body'),
}))

type Output = z.infer<typeof IssuesListOutput>

export const issuesList = pikkuSessionlessFunc({
  description: 'List issues in a repository',
  node: { displayName: 'List Issues', category: 'Issues', type: 'action' },
  input: IssuesListInput,
  output: IssuesListOutput,
  func: async ({ github }, data) => {
    const { owner, repo, ...qs } = data
    return await github.request<Output>('GET', `/repos/${owner}/${repo}/issues`, { qs })
  },
})
