import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ReposListInput = z.object({
  type: z.enum(['all', 'owner', 'public', 'private', 'member']).optional().describe('Type of repositories to list'),
  sort: z.enum(['created', 'updated', 'pushed', 'full_name']).optional().describe('Sort field'),
  per_page: z.number().optional().describe('Results per page (max 100)'),
})

export const ReposListOutput = z.array(z.object({
  id: z.number().describe('Repository ID'),
  name: z.string().describe('Repository name'),
  full_name: z.string().describe('Full repository name'),
  private: z.boolean().describe('Is private repository'),
  html_url: z.string().describe('Repository URL'),
  description: z.string().nullable().describe('Repository description'),
}))

type Output = z.infer<typeof ReposListOutput>

export const reposList = pikkuSessionlessFunc({
  description: 'List repositories for the authenticated user',
  node: { displayName: 'List Repositories', category: 'Repos', type: 'action' },
  input: ReposListInput,
  output: ReposListOutput,
  func: async ({ github }, data) => {
    return await github.request<Output>('GET', '/user/repos', { qs: data })
  },
})
