import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ReposGetInput = z.object({
  owner: z.string().describe('Repository owner'),
  repo: z.string().describe('Repository name'),
})

export const ReposGetOutput = z.object({
  id: z.number().describe('Repository ID'),
  name: z.string().describe('Repository name'),
  full_name: z.string().describe('Full repository name'),
  private: z.boolean().describe('Is private repository'),
  html_url: z.string().describe('Repository URL'),
  description: z.string().nullable().describe('Repository description'),
  fork: z.boolean().describe('Is a fork'),
  stargazers_count: z.number().describe('Star count'),
  watchers_count: z.number().describe('Watchers count'),
  forks_count: z.number().describe('Fork count'),
  open_issues_count: z.number().describe('Open issues count'),
  default_branch: z.string().describe('Default branch'),
})

type Output = z.infer<typeof ReposGetOutput>

export const reposGet = pikkuSessionlessFunc({
  description: 'Get a specific repository',
  node: { displayName: 'Get Repository', category: 'Repos', type: 'action' },
  input: ReposGetInput,
  output: ReposGetOutput,
  func: async ({ github }, data) => {
    return await github.request<Output>('GET', `/repos/${data.owner}/${data.repo}`)
  },
})
